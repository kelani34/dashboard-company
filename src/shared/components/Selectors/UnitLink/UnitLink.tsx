import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";

import classes from "./unitLink.module.css";

interface Props {
  name: string;
  onClickUnit: (e: any) => void;
}

const UnitLink = ({ name, onClickUnit }: Props) => (
  <span role="button" className={classes.unitLink} onClick={onClickUnit} onKeyDown={onClickUnit} tabIndex={0}>
    {name}
  </span>
);

const UnitLinkMemo = memo(UnitLink, areEqual);
export { UnitLinkMemo as UnitLink };
