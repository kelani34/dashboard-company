import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { CheckedMarkSvg } from 'Components/Icons/CheckedMark';

import classes from './inviteEmployeesToast.module.css';

export interface Props {
  showToast: boolean;
  message: string;
}

const InviteEmployeesToast = ({ showToast = false, message }: Props) => (
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

InviteEmployeesToast.defaultProps = {};

const InviteEmployeesToastMemo = memo(InviteEmployeesToast, areEqual);

export { InviteEmployeesToastMemo as InviteEmployeesToast };
