import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Spinner } from 'Components/Spinner';

import classes from './loadingThumbnail.module.css';

const LoadingThumbnail = () => (
  <div className={classes.loadingThumbnailBase}>
    <Spinner loading />
  </div>
);

const LoadingThumbnailMemo = memo(LoadingThumbnail, areEqual);

export { LoadingThumbnailMemo as LoadingThumbnail };
