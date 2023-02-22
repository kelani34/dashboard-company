import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';

import classes from './generalToast.module.css';

interface Props {
  id: string;
  show: boolean;
  message: string;
  icon?: boolean;
  success?: boolean;
  className?: string;
  closeToast: (e: any) => void;
}

const GeneralToast = ({ id, show, message, icon, success, className, closeToast }: Props) => (
  <div
    id={id}
    className={`toast fade d-flex align-items-center position-fixed border-0 bottom-0 ${show ? 'show' : 'hide'} ${
      classes.toastBase
    } ${success ? classes.toastSuccess : classes.toastWarning} ${className || ''} `}
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className={`toast-body ${classes['toast-body-override']} ${classes.toastText}`}>
      {message}
      {icon && (
        <span className={`${classes.toastIcon}`}>
          <Icon type="checkmark" />
        </span>
      )}
    </div>
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

GeneralToast.defaultProps = {
  icon: true,
  success: true,
  className: undefined,
};

const GeneralToastMemo = memo(GeneralToast, areEqual);

export { GeneralToastMemo as GeneralToast };
