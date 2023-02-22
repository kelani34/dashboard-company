import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Spinner } from 'Components/Spinner';

import classes from './spinnerBlock.module.css';

interface Props {
  fetching: boolean;
}

const SpinnerBlock = ({ fetching }: Props) =>
  fetching && (
    <div className={classes.spinnerBlock}>
      <Spinner loading />
    </div>
  );

const SpinnerBlockMemo = memo(SpinnerBlock, areEqual);

export { SpinnerBlockMemo as SpinnerBlock };
