import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { DamagedMaterialsModal } from 'Components/RocketScan';
import { useDamagedMaterialFunctions } from 'Context/RocketScan';

const DamagedMaterialsModalContainer = () => {
  const { isMaterialsModalOpen, onClickSaveButton, onClickCancelButton }: any = useDamagedMaterialFunctions();

  return (
    <DamagedMaterialsModal
      isOpen={isMaterialsModalOpen}
      onSaveClick={onClickSaveButton}
      onCancelClick={onClickCancelButton}
    />
  );
};

const DamagedMaterialsModalContainerMemo = memo(DamagedMaterialsModalContainer, areEqual);

export { DamagedMaterialsModalContainerMemo as DamagedMaterialsModal };
