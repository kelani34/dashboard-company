import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { ExternalAtmosphericTable, RocketDryLocations } from 'Containers/RocketDry';

import classes from './moistureAtmospheric.module.css';

const MoistureAtmospheric = () => (
  <div className={classes.bodyArea}>
    <h2 className={classes.header}>External Atmospheric</h2>
    <ExternalAtmosphericTable />
    <RocketDryLocations />
  </div>
);

const MoistureAtmosphericMemo = memo(MoistureAtmospheric, areEqual);

export { MoistureAtmosphericMemo as MoistureAtmospheric };
