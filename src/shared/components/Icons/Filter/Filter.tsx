import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import Filter from "../../../Assets/filter.svg";

// Custom css
import classes from "./filter.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const FilterSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <Filter id={id} className={`${classes.iconBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

FilterSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const FilterSvgMemo = memo(FilterSvg, areEqualShallow);
export { FilterSvgMemo as FilterSvg };
