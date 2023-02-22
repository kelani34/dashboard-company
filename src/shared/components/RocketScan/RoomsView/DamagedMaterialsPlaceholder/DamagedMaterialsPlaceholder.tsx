import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';

import classes from './damagedMaterialsPlaceholder.module.css';

const DamagedMaterialsPlaceholder = () => (
  <div className={classes.damagedMaterialsPlaceholder}>
    <p>Select a damage type to get started</p>
    <Icon type="rocketemblemtwo" className={classes.icon} />
  </div>
);

const DamagedMaterialsPlaceholderMemo = memo(DamagedMaterialsPlaceholder, areEqual);

export { DamagedMaterialsPlaceholderMemo as DamagedMaterialsPlaceholder };
