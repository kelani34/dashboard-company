import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Modal } from 'Components/Modal';
import { PurpleButton } from 'Components/Button';
import { ValidateBackGround } from 'Components/Validation';
import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';

import formClasses from 'Themes/form/form.module.css';
import classes from './shareReportModal.module.css';

interface Props {
  loading: boolean;
  isOpen: boolean;
  reportName: string;
  email: string;
  formErrors: any;
  modalCloseClick: (e: any) => void;
  onChangeEmail: (e: any) => void;
  onFormSubmit: (e: any) => void;
}

const ShareReportModal = ({
  loading,
  isOpen,
  reportName,
  email,
  formErrors,
  modalCloseClick,
  onChangeEmail,
  onFormSubmit,
}: Props) => (
  <Modal title={`Share ${reportName}?`} isOpen={isOpen} classes={classes} modalHeader modalCloseClick={modalCloseClick}>
    <p>Add an email below that want to send this report to:</p>
    <form className={classes.form} onSubmit={onFormSubmit}>
      <ValidateBackGround isValid={!formErrors?.email.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Email Address" className={formClasses.label} htmlFor="email">
          Type email
        </Label>
        <TextBox
          value={email}
          name="email"
          type="text"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.email.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.email.length ? 'is-invalid' : ''}`}
          required
          placeholder="john.smith@email.com"
          ariaLabel="Please enter an email address"
          onChange={onChangeEmail}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.email.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.email?.[0]}
        </div>
      </ValidateBackGround>
      <div className="d-flex w-100 justify-content-center">
        <PurpleButton onClick={onFormSubmit} className={classes.shareButton} disabled={!email || loading}>
          Share Report
        </PurpleButton>
      </div>
    </form>
  </Modal>
);

const ShareReportModalMemo = memo(ShareReportModal, areEqual);

export { ShareReportModalMemo as ShareReportModal };
