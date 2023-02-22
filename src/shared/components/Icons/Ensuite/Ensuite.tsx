import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import Ensuite from "../../../Assets/ensuite.svg";

// Custom css
import classes from "./ensuite.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const EnsuiteSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <Ensuite id={id} className={`${classes.ensuiteBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

EnsuiteSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const EnsuiteSvgMemo = memo(EnsuiteSvg, areEqualShallow);
export { EnsuiteSvgMemo as EnsuiteSvg };
