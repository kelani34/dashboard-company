import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Icon } from '../Icons';

import classes from './noEmployeesPlaceholder.module.css';

const NoEmployeesPlaceholder = () => (
  <div className={classes.container}>
    <div className={classes.peopleIcon}>
      <Icon type="peoplepinkmedium" />
    </div>
    <p className={classes.information}>You haven't added any employees yet</p>
    <p className={classes.instructions}>Go to the people section, and invite your employees to join your company!</p>
  </div>
);

const NoEmployeesPlaceholderMemo = memo(NoEmployeesPlaceholder, areEqual);

export { NoEmployeesPlaceholderMemo as NoEmployeesPlaceholder };
