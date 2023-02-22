import React, { KeyboardEvent, memo, MouseEvent } from "react";
import { areEqualShallow } from "Utils/equalityChecks";
import classes from "./pillButton.module.css";
/*
    Todo:  Use the bs markup and base classes.
    THen test with an overload on witdh and see which takes precedence.
*/
interface Props {
  className: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  id?: string;
  ariaLabel?: string;
  children?: any;
  onClick?: (e: MouseEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLElement>) => void;
}
const PillButton = ({ ariaLabel, type, className, disabled = false, id, children, onClick, onKeyUp }: Props) => (
  <button
    id={id}
    type={type}
    className={`btn rounded-pill ${classes.pillButtonBase} ${className || ""}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
    disabled={disabled}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

PillButton.defaultProps = {
  onClick: undefined,
  onKeyUp: undefined,
  disabled: undefined,
  id: undefined,
  type: "button",
  ariaLabel: undefined,
  children: undefined,
};
// This to allows default props
const PillButtonMemo = memo(PillButton, areEqualShallow);

// Export it with the correct name
export { PillButtonMemo as PillButton };
