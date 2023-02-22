import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { CheckedMarkSvg } from 'Components/Icons/CheckedMark';

import classes from './photoShareToast.module.css';

export interface Props {
  showToast: boolean;
  message: string;
}

const PhotoShareToast = ({ showToast = false, message }: Props) => (
  <div
    className={`toast fade d-flex align-items-center position-absolute border-0 bottom-0 ${
      showToast ? 'show' : 'hide'
    } ${classes.toastBase} ${classes.toastSuccess}`}
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className={`toast-body ${classes['toast-body-override']} ${classes.toastText}`}>
      {message}
      <span className={`${classes.toastIcon}`}>
        <CheckedMarkSvg />
      </span>
    </div>
  </div>
);

PhotoShareToast.defaultProps = {};

const PhotoShareToastMemo = memo(PhotoShareToast, areEqual);

export { PhotoShareToastMemo as PhotoShareToast };
