/*eslint-disable */
import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";
import classes from "./thumbOverlay.module.css";

interface Props {
  text?: string;
  className?: string;
}

const ThumbOverlay = ({ text }: Props) => (
  <div className={classes.thumbOverlay}>
    <span className={classes.overlayCopy}>{text}</span>
  </div>
);
ThumbOverlay.defaultProps = {
  text: undefined,
  className: undefined,
};
const ThumbOverlayMemo = memo(ThumbOverlay, areEqual);
export { ThumbOverlayMemo as ThumbOverlay };
