import React, { KeyboardEvent, memo, MouseEvent } from 'react';
import { areEqualShallow } from 'Utils/equalityChecks';
import { Button } from '../Button';

import classes from './darkPurpleButton.module.css';

interface Props {
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  outlined?: boolean;
  id?: string;
  children: any;
  onClick?: (e: MouseEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLElement>) => void;
}

const DarkPurpleButton = ({
  className,
  type,
  disabled = false,
  outlined = false,
  id,
  children,
  onClick,
  onKeyUp,
}: Props) => (
  <Button
    id={id}
    type={type}
    className={`btn ${classes.btnBase} ${outlined ? classes.outlined : ''} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
    disabled={disabled}
  >
    {children}
  </Button>
);

DarkPurpleButton.defaultProps = {
  className: undefined,
  onClick: null,
  onKeyUp: null,
  disabled: false,
  outlined: false,
  id: null,
  type: 'button',
};
// This to allows default props
const DarkPurpleButtonMemo = memo(DarkPurpleButton, areEqualShallow);

// Export it with the correct name
export { DarkPurpleButtonMemo as DarkPurpleButton };
