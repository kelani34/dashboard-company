import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import classes from './secondarySpinner.module.css';

interface Props {
  loading: boolean;
}

const SecondarySpinner = ({ loading }: Props) =>
  loading && (
    <div className={classes.spinnerSecondary}>
      <div />
      <div />
    </div>
  );

const SecondarySpinnerMemo = memo(SecondarySpinner, areEqual);
export { SecondarySpinnerMemo as SecondarySpinner };
