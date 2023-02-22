import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';

import { PurpleButton } from 'Components/Button';
import { Icon } from 'Components/Icons';
import { ValidateBackGround } from 'Components/Validation';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Form } from 'Components/Form';
import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';

import classes from './photoShareLink.module.css';

interface Props {
  photosLink: string;
  isButtonDisabled: boolean;
  inviteEmail: string;
  formErrors: any;
  onCopyClick: (e: any) => void;
  onEmailChange: (e: any) => void;
  onFormSubmit: (formData: any) => void;
  onSendClick: (e: any) => void;
}

const PhotoShareLink = ({
  photosLink,
  isButtonDisabled,
  inviteEmail,
  formErrors,
  onCopyClick,
  onEmailChange,
  onFormSubmit,
  onSendClick,
}: Props) => (
  <div>
    <div className={classes.linkContainer}>
      <div className={classes.linkIcon}>
        <Icon type="link" />
        <span className={classes.linkText}>{photosLink}</span>
      </div>
      <CopyToClipboard text={photosLink}>
        <div className={classes.copyIcon} onClick={onCopyClick} onKeyUp={onCopyClick} role="button" tabIndex={0}>
          <Icon type="copy" />
          <span className={classes.copyText}>Copy Link</span>
        </div>
      </CopyToClipboard>
    </div>
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
      </ValidateBackGround>
      <PurpleButton
        className={classes.sendButton}
        type="button"
        onClick={onSendClick}
        disabled={isButtonDisabled}
        outlined
      >
        Send Photo Link
      </PurpleButton>
    </Form>
  </div>
);

// This to allows default props
const PhotoShareLinkMemo = memo(PhotoShareLink, areEqualShallow);

export { PhotoShareLinkMemo as PhotoShareLink };
