import { CheckedMarkSvg } from 'Components/Icons/CheckedMark';
import { Button } from 'Components/Button';
import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import classes from './notesToast.module.css';

interface Props {
  id: string;
  show: boolean;
  message: string;
  icon?: boolean;
  closeToast: (e: any) => void;
}

const NotesToast = ({ id, show, message, icon, closeToast }: Props) => (
  <div
    id={id}
    className={`toast fade d-flex align-items-center position-absolute border-0 bottom-0 ${show ? 'show' : 'hide'} ${
      classes.toastBase
    } ${classes.toastSuccess}`}
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className={`toast-body ${classes['toast-body-override']} ${classes.toastText}`}>
      {message}
      {icon && (
        <span className={`${classes.toastIcon}`}>
          <CheckedMarkSvg />
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

NotesToast.defaultProps = {
  icon: true,
};

const NotesToastMemo = memo(NotesToast, areEqual);

export { NotesToastMemo as NotesToast };
