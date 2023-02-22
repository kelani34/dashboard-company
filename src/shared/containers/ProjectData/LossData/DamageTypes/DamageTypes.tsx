import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { DamageTypes } from 'Components/ProjectData';

import { useLossDataFunctions } from 'Context/LossData';

const DamageTypesContainer = () => {
  const { projectDamageTypes, isEditing, propertyDamageTypes, onEditButtonClick, setIsCustomDamageTypeModalOpen }: any =
    useLossDataFunctions();

  const onCreateCustomDamageTypeTileClick = useCallback(() => {
    setIsCustomDamageTypeModalOpen(true);
  }, []);

  return (
    <DamageTypes
      projectDamageTypes={projectDamageTypes}
      isEditing={isEditing}
      propertyDamageTypes={propertyDamageTypes}
      onEditButtonClick={onEditButtonClick}
      onCreateCustomDamageTypeTileClick={onCreateCustomDamageTypeTileClick}
    />
  );
};

const DamageTypesContainerMemo = memo(DamageTypesContainer, areEqual);

export { DamageTypesContainerMemo as DamageTypes };
