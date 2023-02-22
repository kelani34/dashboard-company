import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import ElectricalRoom from "../../../Assets/electrical-room.svg";

// Custom css
import classes from "./electricalRoom.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ElectricalRoomSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <ElectricalRoom
    id={id}
    className={`${classes.electricalRoomBase} ${className || ""}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

ElectricalRoomSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ElectricalRoomSvgMemo = memo(ElectricalRoomSvg, areEqualShallow);
export { ElectricalRoomSvgMemo as ElectricalRoomSvg };
