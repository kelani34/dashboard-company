import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import DiningRoom from "../../../Assets/dining-room.svg";

// Custom css
import classes from "./diningRoom.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const DiningRoomSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <DiningRoom id={id} className={`${classes.diningRoomBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

DiningRoomSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const DiningRoomSvgMemo = memo(DiningRoomSvg, areEqualShallow);
export { DiningRoomSvgMemo as DiningRoomSvg };
