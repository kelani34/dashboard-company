import React, { KeyboardEvent, memo, MouseEvent } from "react";
import { areEqualShallow } from "Utils/equalityChecks";
import { Button } from "../Button";

import classes from "./purpleButton.module.css";

interface Props {
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  outlined?: boolean;
  id?: string;
  children: any;
  onClick?: (e: MouseEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLElement>) => void;
}

const PurpleButton = ({
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
    className={`btn ${classes.btnBase} ${outlined ? classes.outlined : ""} ${className || ""}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
    disabled={disabled}
  >
    {children}
  </Button>
);

PurpleButton.defaultProps = {
  className: undefined,
  onClick: null,
  onKeyUp: null,
  disabled: false,
  outlined: false,
  id: null,
  type: "button",
};
// This to allows default props
const PurpleButtonMemo = memo(PurpleButton, areEqualShallow);

// Export it with the correct name
export { PurpleButtonMemo as PurpleButton };
