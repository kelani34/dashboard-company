import React, { memo, useState, useEffect, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { LossDataDamageTypeButton } from 'Components/ProjectData';

import { addOrRemoveFromArray } from 'Utils/helpers';

interface Props {
  damageType: any;
  selectedDamageTypes: any[];
  setSelectedDamageTypes: (e: any) => void;
}

const AffectedLocationDamageTypeButtonContainer = ({
  damageType,
  selectedDamageTypes,
  setSelectedDamageTypes,
}: Props) => {
  const [selected, setSelected] = useState(false);

  const onDamageTypeTileClick = useCallback(() => {
    setSelectedDamageTypes(addOrRemoveFromArray(selectedDamageTypes, damageType));
  }, [selectedDamageTypes]);

  useEffect(() => {
    if (selectedDamageTypes.length > 0) {
      setSelected(selectedDamageTypes.some((selectedType) => selectedType.id === damageType.id));
    } else {
      setSelected(false);
    }
  }, [selectedDamageTypes]);

  return <LossDataDamageTypeButton damageType={damageType} selected={selected} onClick={onDamageTypeTileClick} />;
};

const AffectedLocationDamageTypeButtonContainerMemo = memo(AffectedLocationDamageTypeButtonContainer, areEqual);
export { AffectedLocationDamageTypeButtonContainerMemo as AffectedLocationDamageTypeButton };
