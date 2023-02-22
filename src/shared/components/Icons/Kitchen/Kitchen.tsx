import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import Kitchen from "../../../Assets/kitchen.svg";

// Custom css
import classes from "./kitchen.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const KitchenSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <Kitchen id={id} className={`${classes.kitchenBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

KitchenSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const KitchenSvgMemo = memo(KitchenSvg, areEqualShallow);
export { KitchenSvgMemo as KitchenSvg };
