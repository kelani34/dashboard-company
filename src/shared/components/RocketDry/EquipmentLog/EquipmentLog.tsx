import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { RocketDryLocations, EquipmentLogInfoModal, TotalEquipment } from 'Containers/RocketDry';

import classes from './equipmentLog.module.css';

const EquipmentLog = () => (
  <div className={classes.bodyArea}>
    <h2 className={classes.header}>Total Equipment</h2>
    <TotalEquipment />

    <RocketDryLocations />
    <EquipmentLogInfoModal />
  </div>
);

const EquipmentLogMemo = memo(EquipmentLog, areEqual);

export { EquipmentLogMemo as EquipmentLog };
