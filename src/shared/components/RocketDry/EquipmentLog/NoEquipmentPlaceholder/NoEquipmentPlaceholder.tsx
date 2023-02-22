import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';

import classes from './noEquipmentPlaceholder.module.css';

const NoEquipmentPlaceholder = () => (
  <div className={`d-flex justify-content-center align-items-center flex-column w-100 ${classes.noEquipmentContent}`}>
    <p className={classes.noEquipmentText}>No equipment added. To add equipment go to the RocketPlan Mobile App.</p>
    <Icon type="rocketemblem" />
  </div>
);

const NoEquipmentPlaceholderMemo = memo(NoEquipmentPlaceholder, areEqual);

export { NoEquipmentPlaceholderMemo as NoEquipmentPlaceholder };
