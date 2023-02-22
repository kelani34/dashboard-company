import React, { KeyboardEvent, memo, MouseEvent } from 'react';
import { areEqualShallow } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';
import { Button } from '../Button';

import classes from './radioButton.module.css';

interface Props {
  className?: string;
  selected?: boolean;
  disabled?: boolean;
  id?: string;
  value?: string;
  children: any;
  onClick?: (e: MouseEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLElement>) => void;
}

const RadioButton = ({ className, selected, disabled, value, id, children, onClick, onKeyUp }: Props) => (
  <Button
    id={id}
    type="button"
    className={`btn ${classes.btnBase} ${selected ? classes.outlined : ''} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
    disabled={disabled}
    value={value}
  >
    <Icon type={selected ? 'radio' : 'circle16'} />
    <span>{children}</span>
  </Button>
);

RadioButton.defaultProps = {
  value: undefined,
  className: undefined,
  onClick: null,
  onKeyUp: null,
  selected: false,
  disabled: false,
  id: null,
};

// This to allows default props
const RadioButtonMemo = memo(RadioButton, areEqualShallow);

// Export it with the correct name
export { RadioButtonMemo as RadioButton };
