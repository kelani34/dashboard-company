import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import Hallway from "../../../Assets/hallway.svg";

// Custom css
import classes from "./hallway.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const HallwaySvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <Hallway id={id} className={`${classes.hallwayBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

HallwaySvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const HallwaySvgMemo = memo(HallwaySvg, areEqualShallow);
export { HallwaySvgMemo as HallwaySvg };
