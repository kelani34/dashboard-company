import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { OptionsDropDown } from 'Containers/ProjectData';

import classes from './causeOfDamageEdit.module.css';

interface Props {
  damageCauseOptions: any[];
  selectedDamageCauseId: number;
  selectedDamageCauseName: string;
  setSelectedDamageCause: (e: any) => void;
}

const CauseOfDamageEdit = ({
  damageCauseOptions,
  selectedDamageCauseId,
  selectedDamageCauseName,
  setSelectedDamageCause,
}: Props) => (
  <OptionsDropDown
    className={classes.dropDown}
    label="Cause of Damage"
    placeHolder="Select Cause of Damage"
    items={damageCauseOptions}
    optionSelectedId={selectedDamageCauseId}
    optionSelectedName={selectedDamageCauseName}
    setStatusSelected={setSelectedDamageCause}
  />
);

const CauseOfDamageEditMemo = memo(CauseOfDamageEdit, areEqual);

export { CauseOfDamageEditMemo as CauseOfDamageEdit };
