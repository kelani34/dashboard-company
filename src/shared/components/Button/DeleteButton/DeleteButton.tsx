import React, { KeyboardEvent, memo, MouseEvent } from 'react';
import { areEqualShallow } from 'Utils/equalityChecks';
import { Button } from '../Button';

import classes from './deleteButton.module.css';

interface Props {
  className?: string;
  disabled?: boolean;
  id?: string;
  children: any;
  onClick?: (e: MouseEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLElement>) => void;
}

const DeleteButton = ({ className, disabled = false, id, children, onClick, onKeyUp }: Props) => (
  <Button
    id={id}
    type="button"
    className={`btn ${classes.btnBase} ${className}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
    disabled={disabled}
  >
    {children}
  </Button>
);

// This to allows default props
DeleteButton.defaultProps = {
  className: undefined,
  onClick: null,
  onKeyUp: null,
  disabled: false,
  id: null,
};

const DeleteButtonMemo = memo(DeleteButton, areEqualShallow);

// Export it with the correct name
export { DeleteButtonMemo as DeleteButton };
