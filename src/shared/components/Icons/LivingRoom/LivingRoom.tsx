import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import LivingRoom from "../../../Assets/living-room.svg";

// Custom css
import classes from "./livingRoom.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const LivingRoomSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <LivingRoom id={id} className={`${classes.livingRoomBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

LivingRoomSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const LivingRoomSvgMemo = memo(LivingRoomSvg, areEqualShallow);
export { LivingRoomSvgMemo as LivingRoomSvg };
