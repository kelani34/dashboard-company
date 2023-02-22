import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import CaretDown from "../../../Assets/caret-down.svg";

// Custom css
import classes from "./caretDown.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CaretDownSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <CaretDown id={id} className={`${classes.iconBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

CaretDownSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CaretDownSvgMemo = memo(CaretDownSvg, areEqualShallow);
export { CaretDownSvgMemo as CaretDownSvg };
