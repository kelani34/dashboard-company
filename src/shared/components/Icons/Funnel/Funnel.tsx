import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";
import Funnel from "../../../Assets/funnel-fill.svg";

// Custom css
import classes from "./funnel.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const FunnelSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <Funnel id={id} className={`${classes.iconBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

FunnelSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const FunnelSvgMemo = memo(FunnelSvg, areEqual);
export { FunnelSvgMemo as FunnelSvg };
