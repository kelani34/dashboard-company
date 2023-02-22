import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";

import classes from "./mask.module.css";

interface Props {
  toggleSideBar: (e: any) => void;
}

const Mask = ({ toggleSideBar }: Props) => (
  <span
    className={classes.mask}
    onClick={toggleSideBar}
    onKeyUp={toggleSideBar}
    role="button"
    aria-label="close"
    tabIndex={0}
  />
);

const MaskMemo = memo(Mask, areEqual);

export { MaskMemo as Mask };
