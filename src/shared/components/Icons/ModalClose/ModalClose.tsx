import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import ModalClose from "../../../Assets/modal-close.svg";

// Custom css
import classes from "./modalClose.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const ModalCloseSvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <ModalClose id={id} className={`${classes.iconBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

ModalCloseSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ModalCloseSvgMemo = memo(ModalCloseSvg, areEqualShallow);
export { ModalCloseSvgMemo as ModalCloseSvg };
