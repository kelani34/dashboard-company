import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { UnitClaimsModal } from 'Components/ProjectData';
import { listLocations } from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { fetchClaimTypes, updateClaim } from 'Containers/ProjectData/ClaimsData/actions';
import {
  unitClaimCreateErrorSelector,
  policyHolderErrorSelector,
  representativeErrorSelector,
  policyNumberErrorSelector,
  claimNumberErrorSelector,
  claimTypeErrorSelector,
} from 'Containers/RocketScan/MultiUnit/Locations/selectors';

import { useClaimsDataFunctions } from 'Context/ClaimsData';
import { DeleteUnitClaimModal } from './DeleteUnitClaimModal';

const EditUnitClaimsModalContainer = () => {
  const dispatch = useDispatch();

  const {
    claimTypes,
    project,
    locations,
    property,
    claims,
    claimUpdated,
    unitClaimModalIsOpen,
    setUnitClaimModalIsOpen,
    isEditModal,
    unitClaim,
    unit,
    onDeleteClaimButtonClick,
  }: any = useClaimsDataFunctions();

  const [projectId, setProjectId] = useState(0);
  const [selectedUnitId, setSelectedUnitId] = useState(0);
  const [selectedUnitName, setSelectedUnitName] = useState('');
  const [claimId, setClaimId] = useState(0);
  const [selectedClaimTypeId, setSelectedClaimTypeId] = useState(0);
  const [selectedClaimTypeName, setSelectedClaimTypeName] = useState('');
  const [policyHolder, setPolicyHolder] = useState('');
  const [representative, setRepresentative] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [claimNumber, setClaimNumber] = useState('');

  const errors = {
    unitId: useSelector(unitClaimCreateErrorSelector, areEqual),
    policyHolder: useSelector(policyHolderErrorSelector, areEqual),
    representative: useSelector(representativeErrorSelector, areEqual),
    policyNumber: useSelector(policyNumberErrorSelector, areEqual),
    claimNumber: useSelector(claimNumberErrorSelector, areEqual),
    claimType: useSelector(claimTypeErrorSelector, areEqual),
  };

  useEffect(() => {
    if (unit?.id) {
      const { id, name } = unit;
      setSelectedUnitId(id);
      setSelectedUnitName(name);
    }
    if (unitClaim?.id) {
      const {
        id,
        policy_holder: policyHolder,
        representative,
        policy_number: policyNumber,
        claim_number: claimNumber,
        claim_type: claimType,
      } = unitClaim;

      setClaimId(id);
      setPolicyHolder(policyHolder);
      setRepresentative(representative);
      setPolicyNumber(policyNumber);
      setClaimNumber(claimNumber);
      if (claimType?.id) {
        setSelectedClaimTypeName(claimType.name);
        setSelectedClaimTypeId(claimType.id);
      }
    }
  }, [unit, unitClaim]);

  useEffect(() => {
    dispatch(fetchClaimTypes());
  }, []);

  useEffect(() => {
    if (project?.id) {
      const { id } = project;
      setProjectId(id);
    }
  }, [claims, project]);

  useEffect(() => {
    if (property?.id) {
      dispatch(listLocations(property.id));
    }
  }, [locations, property]);

  useEffect(() => {
    if (claimUpdated) {
      setUnitClaimModalIsOpen(false);
    }
  }, [claimUpdated]);

  const onChangePolicyHolder = useCallback(({ target: { value } }) => {
    setPolicyHolder(value);
  }, []);

  const onChangeRepresentative = useCallback(({ target: { value } }) => {
    setRepresentative(value);
  }, []);

  const onChangePolicyNumber = useCallback(({ target: { value } }) => {
    setPolicyNumber(value);
  }, []);

  const onChangeClaimNumber = useCallback(({ target: { value } }) => {
    setClaimNumber(value);
  }, []);

  const onClickCloseClaimsModal = useCallback((e: any) => {
    e.preventDefault();
    setUnitClaimModalIsOpen(false);
  }, []);

  const onCancelButtonClick = useCallback((e: any) => {
    e.preventDefault();
    setUnitClaimModalIsOpen(false);
  }, []);

  const onSaveButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();
      dispatch(
        updateClaim(claimId, {
          policy_holder: policyHolder,
          representative,
          policy_number: policyNumber,
          claim_number: claimNumber,
          claim_type_id: selectedClaimTypeId,
          project_id: projectId,
        })
      );
    },
    [claimId, representative, policyHolder, policyNumber, claimNumber, selectedClaimTypeId, projectId]
  );

  return (
    <>
      <UnitClaimsModal
        isOpen={unitClaimModalIsOpen}
        isEditModal={isEditModal}
        units={locations}
        selectedUnitId={selectedUnitId}
        setSelectedUnitId={setSelectedUnitId}
        selectedUnitName={selectedUnitName}
        selectedClaimTypeId={selectedClaimTypeId}
        setSelectedClaimTypeId={setSelectedClaimTypeId}
        selectedClaimTypeName={selectedClaimTypeName}
        policyHolder={policyHolder}
        representative={representative}
        policyNumber={policyNumber}
        claimNumber={claimNumber}
        claimTypes={claimTypes}
        formErrors={errors}
        onChangePolicyHolder={onChangePolicyHolder}
        onChangeRepresentative={onChangeRepresentative}
        onChangePolicyNumber={onChangePolicyNumber}
        onChangeClaimNumber={onChangeClaimNumber}
        onClickCloseModal={onClickCloseClaimsModal}
        onDeleteButtonClick={onDeleteClaimButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onAddButtonClick={onSaveButtonClick}
      />
      <DeleteUnitClaimModal />
    </>
  );
};

const EditUnitClaimsModalContainerMemo = memo(EditUnitClaimsModalContainer, areEqual);

export { EditUnitClaimsModalContainerMemo as EditUnitClaimsModal };
