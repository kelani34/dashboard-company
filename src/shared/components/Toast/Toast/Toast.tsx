/* eslint-disable */
//The linter does not like how the curly brace on line 44 is not on it's own.
import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { CheckedMarkSvg } from 'Components/Icons/CheckedMark';
import { SET_TOASTER } from 'Containers/Core/actions';

import classes from './toast.module.css';
import { Button } from 'Components/Button';

export interface Props {
  id?: string;
  className?: string;
}

// redux based customizable Toast component
const Toast = ({ id, className }: Props) => {
  const dispatch = useDispatch();

  //Todo:  This needs to be put into a toast container. Not pulled from Redux
  //For use outside of Redux, like api calls.  Consider creating a custom Toast that runs on Redux
  //Do not want UI state management in Redux.
  //Preferably, we just insert a Toast where we want in a component and not have it as a universal control
  const { show, message, success, icon, timeout } = useSelector(({ core: { toast } }: any) => toast, areEqual);

  const closeToast = useCallback(() => {
    if (show) {
      dispatch({
        type: SET_TOASTER,
        payload: {
          show: false,
        },
      });
    }
  }, [show]);

  useEffect(() => {
    if (show)
      //Close it if it's showing.
      setTimeout(() => {
        closeToast();
      }, timeout);
  }, [show]);

  return (
    <div
      id={id}
      className={`toast fade d-flex align-items-center position-absolute border-0 bottom-0 ${
        show ? 'show' : 'd-none'
      } ${className || ''} ${classes.toastBase} ${success ? classes.toastSuccess : classes.toastWarning}`}
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
        ></Button>
      </div>
    </div>
  );
};

Toast.defaultProps = {
  id: undefined,
  className: undefined,
};

const ToastMemo = memo(Toast, areEqual);

export { ToastMemo as Toast };
