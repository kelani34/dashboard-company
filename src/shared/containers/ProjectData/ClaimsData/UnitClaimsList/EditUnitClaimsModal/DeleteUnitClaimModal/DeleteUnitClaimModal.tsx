import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { deleteClaim } from 'Containers/ProjectData/ClaimsData/actions';

import { DeleteUnitClaimModal } from 'Components/ProjectData/ClaimsData/UnitClaims/UnitClaimsList/DeleteUnitClaimModal';
import { useClaimsDataFunctions } from 'Context/ClaimsData';

const DeleteUnitClaimModalContainer = () => {
  const dispatch = useDispatch();

  const {
    setUnitClaimModalIsOpen,
    deleteUnitClaimModalIsOpen,
    setDeleteUnitClaimModalIsOpen,
    unit,
    unitClaim,
    claimDeleted,
  }: any = useClaimsDataFunctions();

  const [claimId, setClaimId] = useState(0);
  const [unitName, setUnitName] = useState('');
  const [claimType, setClaimType] = useState('');

  useEffect(() => {
    if (unit.id) {
      const { name } = unit;
      setUnitName(name);
    }
    if (unitClaim?.id) {
      const { id, claim_type: claimType } = unitClaim;
      setClaimId(id);
      setClaimType(claimType?.name);
    }
  }, [unitClaim]);

  useEffect(() => {
    if (claimDeleted) {
      setUnitClaimModalIsOpen(false);
      setDeleteUnitClaimModalIsOpen(false);
    }
  }, [claimDeleted]);

  const onClickCloseModal = useCallback((e: any) => {
    e.preventDefault();
    setDeleteUnitClaimModalIsOpen(false);
  }, []);

  const onCancelButtonClick = useCallback((e: any) => {
    e.preventDefault();
    setDeleteUnitClaimModalIsOpen(false);
  }, []);

  const onDeleteButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();
      dispatch(deleteClaim(claimId));
    },
    [claimId]
  );

  return (
    <DeleteUnitClaimModal
      isOpen={deleteUnitClaimModalIsOpen}
      unitName={unitName}
      claimType={claimType}
      onClickCloseModal={onClickCloseModal}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );
};

const DeleteUnitClaimModalContainerMemo = memo(DeleteUnitClaimModalContainer, areEqual);

export { DeleteUnitClaimModalContainerMemo as DeleteUnitClaimModal };
