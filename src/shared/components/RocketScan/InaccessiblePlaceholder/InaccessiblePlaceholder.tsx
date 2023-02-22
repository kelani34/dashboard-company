import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { InaccessiblePlaceholderEdit } from 'Containers/RocketScan';
import classes from './inaccessiblePlaceholder.module.css';

interface Props {
  location: any;
}

const InaccessiblePlaceholder = ({ location }: Props) => (
  <div className={`d-flex flex-column justify-content-start align-items-center ${classes.placeHolderWraper}`}>
    <div className={`d-flex flex-column justify-content-center align-items-center ${classes.placeHolderHeader}`}>
      Inaccessible Unit
    </div>
    <div className={`d-flex flex-column justify-content-center align-items-center ${classes.placeHolderBody}`}>
      <div className={classes.placeHolderSubHeading}>
        <Icon type="info" />
        Unit is inaccessible.
      </div>

      <InaccessiblePlaceholderEdit location={location} />
    </div>
  </div>
);

const InaccessiblePlaceholderMemo = memo(InaccessiblePlaceholder, areEqual);

export { InaccessiblePlaceholderMemo as InaccessiblePlaceholder };
