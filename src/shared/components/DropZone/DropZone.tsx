/* eslint-disable */
//The linter does not like prop spreading, but dropzone requires it
import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";
import classes from "./dropzone.module.css";
import { Icon } from "Components/Icons";

interface Props {
  className?: string;
  hasImages: boolean;
  getRootProps: any;
  getInputProps: any;
}

const Dropzone = ({ className, hasImages, getRootProps, getInputProps }: Props) => (
  <>
    <div className={`${classes.dropZoneWrapper}`} {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={`${classes.container} ${hasImages ? classes.hasImages : ""} ${className ? className : ""}`}>
        <div className={`d-flex justify-content-center ${classes.uploadIconContainer}`}>
          <div className={classes.uploadIcon}>
            <Icon type="dropzoneBackground" />
          </div>
        </div>
        <p className={classes.messageContainer}>Click to upload or drop into an album</p>
      </div>
    </div>
  </>
);
Dropzone.defaultProps = {
  className: undefined,
};
const DropzoneMemo = memo(Dropzone, areEqual);
export { DropzoneMemo as Dropzone };
