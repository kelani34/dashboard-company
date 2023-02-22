import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import Elevator from "../../../Assets/elevator.svg";

// Custom css
import classes from "./elevator.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ElevatorSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <Elevator id={id} className={`${classes.elevatorBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

ElevatorSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ElevatorSvgMemo = memo(ElevatorSvg, areEqualShallow);
export { ElevatorSvgMemo as ElevatorSvg };
