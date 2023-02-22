import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import Storage from "../../../Assets/storage.svg";

// Custom css
import classes from "./storage.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const StorageSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <Storage id={id} className={`${classes.storageBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

StorageSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const StorageSvgMemo = memo(StorageSvg, areEqualShallow);
export { StorageSvgMemo as StorageSvg };
