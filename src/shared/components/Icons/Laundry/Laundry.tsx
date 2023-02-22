import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import Laundry from "../../../Assets/laundry.svg";

// Custom css
import classes from "./laundry.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const LaundrySvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <Laundry id={id} className={`${classes.laundryBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

LaundrySvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const LaundrySvgMemo = memo(LaundrySvg, areEqualShallow);
export { LaundrySvgMemo as LaundrySvg };
