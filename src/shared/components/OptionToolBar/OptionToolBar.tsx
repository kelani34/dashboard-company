import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Button } from 'Components/Button';
import { Label } from 'Components/Label';
import classes from './optionToolBar.module.css';

type OptionTypes = {
  id: number; // eslint-disable-line
  value: any; // eslint-disable-line
};

interface Props {
  idForLabel?: string;
  label?: string;
  selectedOption: number;
  optionNames: Array<OptionTypes>;
  onClick: (e: any) => void;
}
const OptionToolBar = ({ idForLabel, label, selectedOption, optionNames, onClick }: Props) => (
  <div className={classes.container} role="toolbar" aria-label="Toolbar with button groups">
    {idForLabel?.length > 0 && (
      <Label ariaLabel={`title-for-${idForLabel}`} htmlFor={idForLabel} className={classes.toolBarLabel}>
        {label}
      </Label>
    )}
    <div id={idForLabel} className={`${classes['button-group']}`} role="group" aria-label="First group">
      {optionNames.length > 0 &&
        optionNames.map(({ id, value }: OptionTypes) => (
          <Button
            key={id}
            id={`${id}`}
            value={id}
            onClick={onClick}
            type="button"
            className={`btn ${classes.sizeButton} ${selectedOption === id ? `${classes.selected}` : ''}`}
          >
            {value}
          </Button>
        ))}
    </div>
  </div>
);

OptionToolBar.defaultProps = {
  idForLabel: undefined,
  label: undefined,
};

const OptionToolBarMemo = memo(OptionToolBar, areEqual);
export { OptionToolBarMemo as OptionToolBar };
