import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Form } from 'Containers/Form';
import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';
import { ValidateBackGround } from 'Components/Validation';
import { PurpleButton } from 'Components/Button/PurpleButton';
import { SignInWrapper } from 'Components/SignIn/SignInWrapper';
import classes from './forgotpassword.module.css';

interface Props {
  isFormValid: boolean;
  isButtonDisabled: boolean;
  onFormSubmit: (e: any) => void;
  onSendResetLinkClick: (e: any) => void;
  onSignInSignUpClick: (e: any) => void;
}

const ForgotPassword = ({
  isFormValid,
  isButtonDisabled,
  onFormSubmit,
  onSendResetLinkClick,
  onSignInSignUpClick,
}: Props) => (
  <SignInWrapper title="Forgot Password">
    <div className={`row ${classes.formTopPadding}`}>
      <div className="col">
        <Form onSubmit={onFormSubmit} className={`g3 d-flex align-items-end ${classes.formWrapper}`} noValidate>
          <ValidateBackGround className={classes.emailInputLeft} isValid={isFormValid}>
            <Label ariaLabel="Email" className={classes.emailLabel} htmlFor="email">
              Email
            </Label>
            <TextBox
              type="email"
              name="email"
              className={`${classes.validateField} ${!isFormValid ? classes.invalidField : classes.validField} ${
                !isFormValid ? 'is-invalid' : ''
              }`}
              placeholder="example@email.com"
              required
              ariaLabel="Please enter a valid email"
            />
            <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>Please enter a valid email</div>
          </ValidateBackGround>
          <PurpleButton
            className={`text-nowrap ${classes.sendResetButton}`}
            type="button"
            onClick={onSendResetLinkClick}
            disabled={isButtonDisabled}
          >
            Send Reset Link
          </PurpleButton>
        </Form>
      </div>
    </div>
    <div className={`d-flex flex-row justify-content-center w-100 ${classes.orRowTopPadding}`}>
      <div className={`col ${classes.hr}`}>
        <hr />
      </div>
      <div className={`col-auto ${classes.orContainer}`}>
        <span className={classes.or}>OR</span>
      </div>
      <div className={`col ${classes.hr}`}>
        <hr />
      </div>
    </div>

    <div className={`row ${classes.returnButtonRowTopPadding}`}>
      <div className="col">
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <PurpleButton className={classes.signInUpButton} type="button" onClick={onSignInSignUpClick} outlined>
            Sign In / Sign Up
          </PurpleButton>
        </div>
      </div>
    </div>
  </SignInWrapper>
);

const ForgotPasswordMemo = memo(ForgotPassword, areEqual);
export { ForgotPasswordMemo as ForgotPassword };
