import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import BedRoom from "../../../Assets/bedroom.svg";

// Custom css
import classes from "./bedRoom.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const BedRoomSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <BedRoom id={id} className={`${classes.bedRoomBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

BedRoomSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const BedRoomSvgMemo = memo(BedRoomSvg, areEqualShallow);
export { BedRoomSvgMemo as BedRoomSvg };
