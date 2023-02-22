import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { DamageIcon } from 'Components/Icons';
import classes from './damageTypeButton.module.css';

interface Props {
  id: number;
  caption: string;
  hasListItems?: boolean;
  isActive?: boolean;
  onButtonClick?: (e: any) => void;
}

const DamageTypeButton = ({ id, caption, hasListItems, isActive, onButtonClick }: Props) => (
  <button
    id={id.toString()}
    className={`${classes.imageButtonCard} ${isActive ? classes.activeList : ''} ${
      hasListItems ? classes.listHasItems : ''
    }`}
    onClick={onButtonClick}
  >
    <DamageIcon type={caption} onClick={onButtonClick} />
    <span className={classes.imageCaption}>{caption}</span>
  </button>
);

DamageTypeButton.defaultProps = {
  hasListItems: undefined,
  isActive: undefined,
  onButtonClick: undefined,
};

const DamageTypeButtonMemo = memo(DamageTypeButton, areEqual);

export { DamageTypeButtonMemo as DamageTypeButton };
