import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import Hand from "../../../Assets/hand.svg";

// Custom css
import classes from "./hand.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const HandSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <Hand id={id} className={`${classes.handBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

HandSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const HandSvgMemo = memo(HandSvg, areEqualShallow);
export { HandSvgMemo as HandSvg };
