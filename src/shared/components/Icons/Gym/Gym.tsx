import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import Gym from "../../../Assets/gym.svg";

// Custom css
import classes from "./gym.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const GymSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <Gym id={id} className={`${classes.gymBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

GymSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const GymSvgMemo = memo(GymSvg, areEqualShallow);
export { GymSvgMemo as GymSvg };
