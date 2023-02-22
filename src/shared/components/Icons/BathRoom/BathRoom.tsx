import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import BathRoom from "../../../Assets/bathroom.svg";

// Custom css
import classes from "./bathRoom.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const BathRoomSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <BathRoom id={id} className={`${classes.BathRoomBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

BathRoomSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const BathRoomSvgMemo = memo(BathRoomSvg, areEqualShallow);
export { BathRoomSvgMemo as BathRoomSvg };
