import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';

import classes from './noRecordingsPlaceholder.module.css';

const NoRecordingsPlaceholder = () => (
  <div className={`d-flex justify-content-center align-items-center flex-column w-100 ${classes.noRecordingsContent}`}>
    <p className={classes.noRecordingsText}>No recordings taken. To add readings go to the company Mobile App.</p>
    <Icon type="rocketemblem" />
  </div>
);

const NoRecordingsPlaceholderMemo = memo(NoRecordingsPlaceholder, areEqual);

export { NoRecordingsPlaceholderMemo as NoRecordingsPlaceholder };
