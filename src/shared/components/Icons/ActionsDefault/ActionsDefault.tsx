import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import ActionsDefault from "../../../Assets/actions-default.svg";

// Custom css
import classes from "./actionsDefault.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ActionsDefaultSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <ActionsDefault
    id={id}
    className={`${classes.actionsDefaultBase} ${className || ""}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

ActionsDefaultSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ActionsDefaultSvgMemo = memo(ActionsDefaultSvg, areEqualShallow);
export { ActionsDefaultSvgMemo as ActionsDefaultSvg };
