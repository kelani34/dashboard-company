import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { SecondarySpinner } from 'Components/SecondarySpinner';
import classes from './loadingBox.module.css';

const LoadingBox = () => (
  <div className={classes.container}>
    <div className={classes.title}>Files Uploading...</div>
    <div className={classes.inner}>
      <SecondarySpinner loading />
    </div>
  </div>
);

const LoadingBoxMemo = memo(LoadingBox, areEqual);
export { LoadingBoxMemo as LoadingBox };
