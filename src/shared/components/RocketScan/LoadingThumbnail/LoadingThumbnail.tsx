import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { SecondarySpinner } from 'Components/SecondarySpinner';
import classes from './loadingThumbnail.module.css';

const LoadingThumbnail = () => (
  <div className={classes.container}>
    <div className={classes.title}>File Uploading...</div>
    <SecondarySpinner loading />
  </div>
);

const LoadingThumbnailMemo = memo(LoadingThumbnail, areEqual);
export { LoadingThumbnailMemo as LoadingThumbnail };
