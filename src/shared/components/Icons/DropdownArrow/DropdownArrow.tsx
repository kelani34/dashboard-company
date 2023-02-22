import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";
import DropdownArrow from "../../../Assets/chevron-down.svg";

// Custom css
import classes from "./dropdownArrow.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const DropdownArrowSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <DropdownArrow id={id} className={`${classes.iconBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

DropdownArrowSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const DropdownArrowSvgMemo = memo(DropdownArrowSvg, areEqual);
export { DropdownArrowSvgMemo as DropdownArrowSvg };
