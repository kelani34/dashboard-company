import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { DamageIcon } from 'Components/Icons/DamageIcon';

import classes from './lossDataDamageTypeButton.module.css';

interface Props {
  damageType: any;
  selected: boolean;
  onClick?: (e: any) => void;
}

const LossDataDamageTypeButton = ({ damageType, selected, onClick }: Props) => (
  <button
    id={damageType.id.toString()}
    className={`${classes.imageButtonCard} ${selected ? classes.selected : ''}`}
    onClick={onClick}
  >
    <DamageIcon type={damageType.is_standard ? damageType.name : 'custom'} onClick={onClick} />
    <span>{damageType.name}</span>
  </button>
);

LossDataDamageTypeButton.defaultProps = {
  onClick: undefined,
};

const LossDataDamageTypeButtonMemo = memo(LossDataDamageTypeButton, areEqual);
export { LossDataDamageTypeButtonMemo as LossDataDamageTypeButton };
