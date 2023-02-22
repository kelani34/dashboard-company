import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDamagedMaterialFunctions } from 'Context/RocketScan';
import { DamagedMaterialRow } from 'Components/RocketScan';

interface Props {
  material: any;
}

const DamagedMaterialListItemContainer = ({ material }: Props) => {
  const { selectedMaterials, onDamagedListItemClick }: any = useDamagedMaterialFunctions();

  const { id, name } = material;

  const [isSelected, setIsSelected] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(undefined);

  const onClick = useCallback(() => {
    onDamagedListItemClick(material);
  }, [onDamagedListItemClick]);

  useEffect(() => {
    const selected = selectedMaterials.find((mat: any) => mat.id === id);
    if (selected) {
      setIsSelected(true);
      setSelectedMaterial(selected);
    } else {
      setIsSelected(false);
      setSelectedMaterial(undefined);
    }
  }, [selectedMaterials]);

  return (
    <DamagedMaterialRow
      id={id}
      name={name}
      onClick={onClick}
      isSelected={isSelected}
      selectedMaterial={selectedMaterial}
    />
  );
};

const DamagedMaterialListItemContainerMemo = memo(DamagedMaterialListItemContainer, areEqual);

export { DamagedMaterialListItemContainerMemo as DamagedMaterialListItemContainer };
