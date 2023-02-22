import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { UnitClaimsModal } from 'Components/ProjectData';
import {
  createLocationClaim,
  listLocations,
  setLocationClaimCreated,
} from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { fetchClaimTypes } from 'Containers/ProjectData/ClaimsData/actions';
import {
  unitClaimCreateErrorSelector,
  policyHolderErrorSelector,
  representativeErrorSelector,
  policyNumberErrorSelector,
  claimNumberErrorSelector,
  claimTypeErrorSelector,
} from 'Containers/RocketScan/MultiUnit/Locations/selectors';

import { useClaimsDataFunctions } from 'Context/ClaimsData';

const UnitClaimsModalContainer = () => {
  const dispatch = useDispatch();

  const {
    claimTypes,
    project,
    locations,
    property,
    claims,
    unitClaimCreated,
    unitClaimModalIsOpen,
    setUnitClaimModalIsOpen,
  }: any = useClaimsDataFunctions();

  const [projectId, setProjectId] = useState(undefined);
  const [selectedUnitId, setSelectedUnitId] = useState(undefined);
  const [selectedUnitName, setSelectedUnitName] = useState('');
  const [selectedClaimTypeId, setSelectedClaimTypeId] = useState(undefined);
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
    dispatch(fetchClaimTypes());
  }, [claimTypes]);

  useEffect(() => {
    if (claimTypes?.id) {
      const { name } = claimTypes;
      setSelectedClaimTypeName(name);
    }
  }, [claimTypes]);

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
    if (unitClaimCreated) {
      setUnitClaimModalIsOpen(false);
      setSelectedUnitId('');
      setSelectedUnitName('');
      setPolicyHolder('');
      setRepresentative('');
      setPolicyNumber('');
      setClaimNumber('');
      setSelectedClaimTypeId('');
      setSelectedClaimTypeName('');
      dispatch(setLocationClaimCreated(false));
    }
  }, [unitClaimCreated]);

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
    setSelectedUnitId('');
    setSelectedUnitName('');
    setPolicyHolder('');
    setRepresentative('');
    setPolicyNumber('');
    setClaimNumber('');
    setSelectedClaimTypeId('');
    setSelectedClaimTypeName('');
  }, []);

  const onAddButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();
      dispatch(
        createLocationClaim(selectedUnitId, {
          policy_holder: policyHolder,
          representative,
          policy_number: policyNumber,
          claim_number: claimNumber,
          claim_type_id: selectedClaimTypeId,
          project_id: projectId,
        })
      );
    },
    [selectedUnitId, representative, policyHolder, policyNumber, claimNumber, selectedClaimTypeId, projectId]
  );

  return (
    <UnitClaimsModal
      isOpen={unitClaimModalIsOpen}
      isEditModal={false}
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
      onCancelButtonClick={onCancelButtonClick}
      onAddButtonClick={onAddButtonClick}
    />
  );
};

const UnitClaimsModalContainerMemo = memo(UnitClaimsModalContainer, areEqual);

export { UnitClaimsModalContainerMemo as UnitClaimsModal };
