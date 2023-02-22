import React, { memo, useCallback, useEffect, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { DamageTypeButton } from 'Components/RocketScan';
import { useDamagedMaterialFunctions } from 'Context/RocketScan';

interface Props {
  id: number;
  caption: string;
}

const DamageTypeButtonContainer = ({ id, caption }: Props) => {
  // global functions
  const { selectedMaterials, selectedDamagedType, onDamagedTypeTileClick }: any = useDamagedMaterialFunctions();

  const [hasListItems, setHasListItems] = useState(false);

  useEffect(() => {
    if (selectedMaterials.length > 0) {
      setHasListItems(selectedMaterials.some(({ damage_type: { id: damageTypeId } }: any) => damageTypeId === id));
    } else {
      setHasListItems(false);
    }
  }, [selectedMaterials]);

  const onDamageButtonClick = useCallback(() => {
    onDamagedTypeTileClick(id);
  }, []);

  return (
    <DamageTypeButton
      id={id}
      caption={caption}
      hasListItems={hasListItems}
      isActive={selectedDamagedType === id}
      onButtonClick={onDamageButtonClick}
    />
  );
};

const DamageTypeButtonContainerMemo = memo(DamageTypeButtonContainer, areEqual);

export { DamageTypeButtonContainerMemo as DamageTypeButton };
