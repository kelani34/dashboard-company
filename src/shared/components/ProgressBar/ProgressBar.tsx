/* eslint-disable */
/* eslint is disabled to bypass associated label error */

import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";

// css
import classes from "./progressBar.module.css";

interface Props {
  className?: string;
  now?: number;
  min?: number;
  max: number;
  hide?: boolean;
}

/*
  Can I use the BS classes for 0, 25, 50, 100 
  and animate them as they change?
*/
const setProgressClass = (progress: number) => {
  //for the sake of speed, we'll use this instead of a switch
  if (progress === 0) return "";
  else if (progress <= 25) return "w-25";
  else if (progress > 25 && progress <= 50) return "w-50";
  else if (progress > 50 && progress <= 75) return "w-75";
  else return "w-100"; //Progress can only be between 76 and 100
};
const ProgressBar = ({ className, now, min, max, hide = false }: Props) => (
  <div className={`${classes.progressBarHideTransistion} ${hide ? classes.progressBarHide : ""}`}>
    <div className={`progress ${classes.progressBarBase}`}>
      <div
        className={`progress-bar ${classes.progressBar} ${className ? className : ""} ${setProgressClass(max)}`}
        role="progressbar"
        aria-valuenow={now}
        aria-valuemin={min}
        aria-valuemax={max}
      />
    </div>
  </div>
);
ProgressBar.defaultProps = {
  now: undefined,
  min: 25,
  className: undefined,
};

const ProgressBarMemo = memo(ProgressBar, areEqual);

export { ProgressBarMemo as ProgressBar };
