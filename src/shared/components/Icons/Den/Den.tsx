import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import Den from "../../../Assets/den.svg";

// Custom css
import classes from "./den.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const DenSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <Den id={id} className={`${classes.denBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

DenSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const DenSvgMemo = memo(DenSvg, areEqualShallow);
export { DenSvgMemo as DenSvg };
