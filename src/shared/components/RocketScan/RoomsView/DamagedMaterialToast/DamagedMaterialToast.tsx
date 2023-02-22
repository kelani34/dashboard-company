import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Button } from 'Components/Button';
import classes from './damagedMaterialToast.module.css';

export interface Props {
  id?: string;
  className?: string;
  isDisplayed: boolean;
  message: string;
  closeToast: (e: any) => void;
}

// redux based customizable Toast component
const DamagedMaterialToast = ({ id, className, isDisplayed = false, message, closeToast }: Props) => (
  <div
    id={id}
    className={`toast fade d-flex align-items-center position-fixed border-0 bottom-0 ${
      isDisplayed ? 'show' : `hide ${classes.hidden}`
    } ${className || ''} ${classes.toastBase} ${classes.toastSuccess}`}
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className={`toast-body ${classes['toast-body-override']} ${classes.toastText}`}>{message}</div>
    <div className={classes.toastCloseButtonContainer}>
      <Button
        type="button"
        className={`btn-close ${classes.toastCloseButton}`}
        data-bs-dismiss="toast"
        aria-label="Close"
        onClick={closeToast}
      />
    </div>
  </div>
);

DamagedMaterialToast.defaultProps = {
  id: undefined,
  className: undefined,
};

const DamagedMaterialToastMemo = memo(DamagedMaterialToast, areEqual);

export { DamagedMaterialToastMemo as DamagedMaterialToast };
