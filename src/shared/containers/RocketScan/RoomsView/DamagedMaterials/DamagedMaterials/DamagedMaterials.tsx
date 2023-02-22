import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { DamagedMaterials } from 'Components/RocketScan';
import { useDamagedMaterialFunctions } from 'Context/RocketScan';

const DamagedMaterialsContainer = () => {
  // global functions
  const { roomId, damageTypes, editMode, damagesCount, onClickEditButton }: any = useDamagedMaterialFunctions();

  return (
    <DamagedMaterials
      roomId={roomId}
      damagesCount={damagesCount}
      editMode={editMode}
      damageTypes={damageTypes}
      onClickEditButton={onClickEditButton}
    />
  );
};

const DamagedMaterialsContainerMemo = memo(DamagedMaterialsContainer, areEqual);

export { DamagedMaterialsContainerMemo as DamagedMaterials };
