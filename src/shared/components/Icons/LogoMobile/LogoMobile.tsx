import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import LogoMobile from "../../../Assets/logo-mobile.svg";

// Custom css
import classes from "./logoMobile.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const LogoMobileSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <LogoMobile id={id} className={`${classes.logoBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

LogoMobileSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const LogoMobileSvgMemo = memo(LogoMobileSvg, areEqualShallow);
export { LogoMobileSvgMemo as LogoMobileSvg };
