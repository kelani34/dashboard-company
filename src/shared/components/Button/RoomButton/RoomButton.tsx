import React, { KeyboardEvent, memo, MouseEvent } from 'react';
import { areEqualShallow } from 'Utils/equalityChecks';
import { Button } from '../Button';

import classes from './roomButton.module.css';

interface Props {
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  isActive?: boolean;
  id?: string;
  children: any;
  onClick?: (e: MouseEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLElement>) => void;
}

const RoomButton = React.forwardRef(
  ({ className, type, disabled = false, isActive, id, children, onClick, onKeyUp }: Props, buttonsRef: any) => (
    <Button
      ref={buttonsRef}
      id={id}
      type={type}
      className={`btn ${classes.roomBtnBase} ${className} ${isActive ? classes.isActive : ''}`}
      onClick={onClick}
      onKeyUp={onKeyUp}
      disabled={disabled}
    >
      {children}
    </Button>
  )
);

RoomButton.defaultProps = {
  className: undefined,
  onClick: null,
  onKeyUp: null,
  disabled: false,
  isActive: false,
  id: null,
  type: 'button',
};
// This to allows default props
const RoomButtonMemo = memo(RoomButton, areEqualShallow);

// Export it with the correct name
export { RoomButtonMemo as RoomButton };
