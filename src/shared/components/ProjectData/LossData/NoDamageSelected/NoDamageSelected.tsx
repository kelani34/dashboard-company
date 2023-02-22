import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button';

import classes from './noDamageSelected.module.css';

interface Props {
  onAddDamagesButtonClick: (e: any) => void;
}

const NoDamageSelected = ({ onAddDamagesButtonClick }: Props) => (
  <div className={classes.container}>
    <h3 className={classes.bolded}>No Types of Damage Selected</h3>
    <div>Select types of damage that have occured in the project</div>
    <PurpleButton outlined className={classes.addDamagesButton} onClick={onAddDamagesButtonClick}>
      Add Damages
    </PurpleButton>
  </div>
);

const NoDamageSelectedMemo = memo(NoDamageSelected, areEqual);

export { NoDamageSelectedMemo as NoDamageSelected };
