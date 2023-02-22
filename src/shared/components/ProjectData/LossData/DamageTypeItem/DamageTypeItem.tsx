import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { DamageIcon } from 'Components/Icons/DamageIcon';

import classes from './damageTypeItem.module.css';

interface Props {
  damageType: any;
}

const DamageTypeItem = ({ damageType }: Props) => (
  <div className={classes.container}>
    <DamageIcon type={damageType.is_standard ? damageType.name : 'custom'} />
    <span className={classes.label}>{damageType.name}</span>
  </div>
);

const DamageTypeItemMemo = memo(DamageTypeItem, areEqual);
export { DamageTypeItemMemo as DamageTypeItem };
