import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { CheckedMarkSvg } from 'Components/Icons/CheckedMark';

import { Button } from 'Components/Button';

import classes from 'Themes/toast/coreToast.module.css';

interface Props {
  showContactTypeToast: boolean;
  onClickCloseToast: (e: any) => void;
}

const ContactTypeToast = ({ showContactTypeToast, onClickCloseToast }: Props) => (
  <div
    className={`toast fade d-flex align-items-center position-absolute border-0 bottom-0 ${
      showContactTypeToast ? 'show' : 'hide'
    } ${classes.toastBase} ${classes.toastSuccess}`}
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className={`toast-body ${classes['toast-body-override']} ${classes.toastText}`}>
      This contact is a company
      <span className={`${classes.toastIcon}`}>
        <CheckedMarkSvg />
      </span>
    </div>
    <div className={classes.toastCloseButtonContainer}>
      <Button
        type="button"
        className={`btn-close ${classes.toastCloseButton}`}
        data-bs-dismiss="toast"
        aria-label="Close"
        onClick={onClickCloseToast}
      />
    </div>
  </div>
);

const ContactTypeToastMemo = memo(ContactTypeToast, areEqual);

export { ContactTypeToastMemo as ContactTypeToast };
