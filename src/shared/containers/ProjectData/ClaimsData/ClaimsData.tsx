import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { ClaimsData } from 'Components/ProjectData';
import { useClaimsDataFunctions } from 'Context/ClaimsData';
import { UnitClaimsModal } from './UnitClaimsModal';
import { EditUnitClaimsModal } from './UnitClaimsList';

const ClaimsDataContainer = () => {
  const { projectAddress, editIsOpen, onEditButtonClick, isEditModal }: any = useClaimsDataFunctions();

  return (
    <>
      <ClaimsData projectAddress={projectAddress} editIsOpen={editIsOpen} onEditButtonClick={onEditButtonClick} />
      {!isEditModal ? <UnitClaimsModal /> : <EditUnitClaimsModal />}
    </>
  );
};

const ClaimsDataContainerMemo = memo(ClaimsDataContainer, areEqual);

export { ClaimsDataContainerMemo as ClaimsData };
