import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { TextBox } from 'Components/TextBox';
import { Form } from 'Components/Form';
import { Label } from 'Components/Label';
import { PurpleButton } from 'Components/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal } from 'Components/Modal';
import { ValidateBackGround } from 'Components/Validation';
import { InviteEmployeesToast } from './InviteEmployeesToast';

import classes from './inviteEmployees.module.css';

interface Props {
  isOpen?: boolean;
  emailLink: string;
  inviteEmail: string;
  isButtonDisabled: boolean;
  formErrors: any;
  showToast: boolean;
  toastMessage: string;
  onCopyClick: (e: any) => void;
  onEmailChange: (e: any) => void;
  onFormSubmit: (formData: any) => void;
  onSendClick: (e: any) => void;
  onClickCloseInviteEmployees: (e: any) => void;
  header: any;
  footer: any;
}

const InviteEmployees = ({
  isOpen = false,
  emailLink,
  inviteEmail,
  isButtonDisabled,
  formErrors,
  showToast,
  toastMessage,
  onCopyClick,
  onEmailChange,
  onFormSubmit,
  onSendClick,
  onClickCloseInviteEmployees,
  header,
  footer,
}: Props) => (
  <Modal
    id="inviteEmployeesModal"
    classes={classes}
    title="Invite Employees"
    isOpen={isOpen}
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    leftHeaderIcon="peoplepinksmall"
    modalHeader
    modalCloseClick={onClickCloseInviteEmployees}
    toast={<InviteEmployeesToast showToast={showToast} message={toastMessage} />}
  >
    {header}
    <div className={classes.linkContainer}>
      <div className={classes.linkIcon}>
        <Icon type="link" />
        <span className={classes.linkText}>{emailLink}</span>
      </div>
      <CopyToClipboard text={emailLink}>
        <div className={classes.copyIcon} onClick={onCopyClick} onKeyUp={onCopyClick} role="button" tabIndex={0}>
          <Icon type="copy" />
          <span className={classes.copyText}>Copy Link</span>
        </div>
      </CopyToClipboard>
    </div>
    <p className={classes.optionText}>Or Send by email</p>
    <Form className={classes.form} onSubmit={onFormSubmit} noValidate>
      <ValidateBackGround isValid={!formErrors?.email.length}>
        <Label ariaLabel="Email" className={classes.emailLabel} htmlFor="email">
          Type email
        </Label>
        <TextBox
          name="email"
          type="text"
          className={`${classes.validateField} ${
            formErrors?.email.length ? classes.invalidField : classes.validField
          } ${formErrors?.email.length ? 'is-invalid' : ''}`}
          placeholder="john.smith@example.com"
          ariaLabel="Email"
          value={inviteEmail}
          onChange={onEmailChange}
        />
        <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>{formErrors?.email?.[0]}</div>
        <PurpleButton className={classes.sendButton} type="button" onClick={onSendClick} disabled={isButtonDisabled}>
          Send
        </PurpleButton>
      </ValidateBackGround>
    </Form>
    {footer}
  </Modal>
);

InviteEmployees.defaultProps = {
  isOpen: false,
};

// This to allows default props
const InviteEmployeesMemo = memo(InviteEmployees, areEqualShallow);

export { InviteEmployeesMemo as InviteEmployees };
