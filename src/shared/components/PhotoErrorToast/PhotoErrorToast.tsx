/* eslint-disable */
//The linter does not like how the curly brace on line 44 is not on it's own.
import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";

import classes from "./photoErrorToast.module.css";
import { Button } from "Components/Button";

export interface Props {
  id?: string;
  className?: string;
  isDisplayed: boolean;
  closeToast: (e: any) => void;
}

// redux based customizable Toast component
const PhotoErrorToast = ({ id, className, isDisplayed = false, closeToast }: Props) => {
  return (
    <div
      id={id}
      className={`toast fade d-flex align-items-center position-fixed border-0 bottom-0 ${
        isDisplayed ? "show" : "hide"
      } ${className || ""} ${classes.toastBase} ${classes.toastWarning}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className={`toast-body ${classes["toast-body-override"]} ${classes.toastText}`}>
        Could not upload some of the photos. The only format that are supported are jpg, jpeg, and png.
      </div>
      <div className={classes.toastCloseButtonContainer}>
        <Button
          type="button"
          className={`btn-close ${classes.toastCloseButton}`}
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={closeToast}
        ></Button>
      </div>
    </div>
  );
};

PhotoErrorToast.defaultProps = {
  id: undefined,
  className: undefined,
};

const PhotoErrorToastMemo = memo(PhotoErrorToast, areEqual);

export { PhotoErrorToastMemo as PhotoErrorToast };
