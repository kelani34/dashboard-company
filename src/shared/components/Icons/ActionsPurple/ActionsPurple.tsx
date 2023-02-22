import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import ActionsPurple from "../../../Assets/actions-purple.svg";

// Custom css
import classes from "./actionsPurple.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ActionsPurpleSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <ActionsPurple
    id={id}
    className={`${classes.actionsPurpleBase} ${className || ""}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

ActionsPurpleSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ActionsPurpleSvgMemo = memo(ActionsPurpleSvg, areEqualShallow);
export { ActionsPurpleSvgMemo as ActionsPurpleSvg };
