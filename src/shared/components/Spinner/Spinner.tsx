import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import classes from './spinner.module.css';

interface Props {
  loading: boolean;
}

const Spinner = ({ loading }: Props) => {
  if (loading) {
    return (
      <div className={`${classes.spinnerBase}`}>
        <div />
        <div />
      </div>
    );
  }

  return null;
};

const SpinnerMemo = memo(Spinner, areEqual);

export { SpinnerMemo as Spinner };
