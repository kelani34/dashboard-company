import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import CloseCircle from "../../../Assets/closecircle.svg";

// Custom css
import classes from "./closeCircle.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CloseCircleSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <CloseCircle
    id={id}
    className={`${classes.closeCircleBase} ${className || ""}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

CloseCircleSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CloseCircleSvgMemo = memo(CloseCircleSvg, areEqualShallow);
export { CloseCircleSvgMemo as CloseCircleSvg };
