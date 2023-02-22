import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import classes from './equipmentCount.module.css';

interface Props {
  name: string;
  icon: ReactNode;
  count: number;
}

const EquipmentCount = ({ name, icon, count }: Props) => (
  <div className={classes.itemCountContainer}>
    <div className={classes.equipmentInfo}>
      <div className={classes.equipmentIcon}>{icon}</div>
      <div className={classes.equipmentText}>
        <div className={classes.typeLabel}>Type of Equipment</div>
        <div className={classes.type}>{name}</div>
      </div>
    </div>
    <div className={classes.count}>{count}</div>
  </div>
);

const EquipmentCountMemo = memo(EquipmentCount, areEqual);

export { EquipmentCountMemo as EquipmentCount };
