import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import ArrowLeft from "../../../Assets/arrow-left.svg";

// Custom css
import classes from "./arrowLeft.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ArrowLeftSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <ArrowLeft id={id} className={`${classes.arrowLeftBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

ArrowLeftSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ArrowLeftSvgMemo = memo(ArrowLeftSvg, areEqualShallow);
export { ArrowLeftSvgMemo as ArrowLeftSvg };
