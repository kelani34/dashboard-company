import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import Stairway from "../../../Assets/stairway.svg";

// Custom css
import classes from "./stairway.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const StairwaySvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <Stairway id={id} className={`${classes.stairwayBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

StairwaySvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const StairwaySvgMemo = memo(StairwaySvg, areEqualShallow);
export { StairwaySvgMemo as StairwaySvg };
