import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';

import classes from './reportsEmpty.module.css';

const ReportsEmpty = () => (
  <div className="d-flex flex-column w-100 justify-content-center m-3">
    <p className={classes.p}>No reports yet. Create a report</p>
    <Icon type="rocketemblem" className={classes.icon} />
  </div>
);

const ReportsEmptyMemo = memo(ReportsEmpty, areEqual);

export { ReportsEmptyMemo as ReportsEmpty };
