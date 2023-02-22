import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import CaretUp from "../../../Assets/caret-up.svg";

// Custom css
import classes from "./caretUp.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CaretUpSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <CaretUp id={id} className={`${classes.iconBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

CaretUpSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CaretUpSvgMemo = memo(CaretUpSvg, areEqualShallow);
export { CaretUpSvgMemo as CaretUpSvg };
