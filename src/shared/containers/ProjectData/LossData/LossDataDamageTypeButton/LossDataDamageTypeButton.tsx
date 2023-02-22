import React, { memo, useState, useEffect, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { LossDataDamageTypeButton } from 'Components/ProjectData';

import { useLossDataFunctions } from 'Context/LossData';

import { addOrRemoveFromArray } from 'Utils/helpers';

interface Props {
  damageType: any;
}

const LossDataDamageTypeButtonContainer = ({ damageType }: Props) => {
  const { selectedDamageTypes, setSelectedDamageTypes }: any = useLossDataFunctions();

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

const LossDataDamageTypeButtonContainerMemo = memo(LossDataDamageTypeButtonContainer, areEqual);
export { LossDataDamageTypeButtonContainerMemo as LossDataDamageTypeButton };
