import React, { memo } from 'react';
import { Icon } from 'Components/Icons';

import { areEqual } from 'Utils/equalityChecks';

import classes from './employeesEmptyPlaceholder.module.css';

const EmployeesEmptyPlaceholder = () => (
  <div className={`d-flex flex-column justify-content-center align-items-center ${classes.contentWrapper}`}>
    <div className={classes.content}>
      <Icon type="peoplepink" />
      <div className={classes.heading}>You haven’t added any team employees yet</div>
      <div className={classes.copy}>Go to the people section, and invite your employees to join your company!</div>
    </div>
  </div>
);

const EmployeesEmptyPlaceholderMemo = memo(EmployeesEmptyPlaceholder, areEqual);

export { EmployeesEmptyPlaceholderMemo as EmployeesEmptyPlaceholder };
