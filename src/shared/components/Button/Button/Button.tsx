import React, { KeyboardEvent, memo, MouseEvent } from 'react';
import { areEqualShallow } from 'Utils/equalityChecks';
/*
    Todo:  Use the bs markup and base classes.
    THen test with an overload on witdh and see which takes precedence.
*/
interface Props {
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  ariaLabel?: string;
  value?: any;
  children?: any;
  dataId?: number | string;
  dataName?: string;
  onClick?: (e: MouseEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLElement>) => void;
}
const Button = React.forwardRef(
  (
    { ariaLabel, type, className, disabled = false, id, value, children, dataId, dataName, onClick, onKeyUp }: Props,
    buttonRef: any
  ) =>
    buttonRef ? (
      <button
        ref={(ref) => {
          buttonRef.current = ref;
        }}
        id={id}
        type={type}
        value={value}
        data-id={dataId}
        data-name={dataName}
        className={`btn ${className || ''}`}
        onClick={onClick}
        onKeyUp={onKeyUp}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    ) : (
      <button
        id={id}
        type={type}
        value={value}
        data-id={dataId}
        data-name={dataName}
        className={`btn ${className || ''}`}
        onClick={onClick}
        onKeyUp={onKeyUp}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    )
);

Button.defaultProps = {
  className: undefined,
  onClick: undefined,
  onKeyUp: undefined,
  disabled: undefined,
  id: undefined,
  value: undefined,
  dataId: null,
  dataName: null,
  type: 'button',
  ariaLabel: undefined,
  children: undefined,
};
// This to allows default props
const ButtonMemo = memo(Button, areEqualShallow);

// Export it with the correct name
export { ButtonMemo as Button };
