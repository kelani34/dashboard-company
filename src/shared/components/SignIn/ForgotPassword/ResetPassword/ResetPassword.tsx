import React, { memo } from 'react';

import { Label } from 'Components/Label';
import { SignInWrapper } from 'Components/SignIn/SignInWrapper';
import { TextBox } from 'Components/TextBox';
import { ValidateBackGround } from 'Components/Validation';
import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';
import { PurpleButton } from 'Components/Button';
import classes from './resetpassword.module.css';

interface Props {
  isPasswordValid: boolean;
  isConfirmedPasswordValid: boolean;
  showPassword: boolean;
  passwordChangeMessage: string;
  formErrors: any;
  onChangePassword: (e: any) => void;
  onChangeConfirmPassword: (e: any) => void;
  togglePasswordShow: (e: any) => void;
  onResetPasswordClick: (e: any) => void;
}

const errors = (error: string) => (
  <div key={error} className={`${classes.invalidFieldFeedback} invalid-feedback ${error ? 'd-block' : ''}`}>
    {error}
  </div>
);
const ResetPassword = ({
  isPasswordValid,
  isConfirmedPasswordValid,
  showPassword,
  formErrors,
  passwordChangeMessage,
  onChangePassword,
  onChangeConfirmPassword,
  onResetPasswordClick,
  togglePasswordShow,
}: Props) => (
  <SignInWrapper title="Reset Password">
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3">
        <form className={`requires-validation g3 ${classes.formWrapper}`} noValidate action="#">
          {formErrors?.email.length > 0 && (
            <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>{formErrors?.email?.[0]}</div>
          )}
          {formErrors?.token.length > 0 && (
            <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>{formErrors?.token?.[0]}</div>
          )}

          <ValidateBackGround isValid={isPasswordValid} className={classes.inputContainer}>
            <Label ariaLabel="Password" className={classes.emailLabel} htmlFor="Password">
              Password
            </Label>
            <div className="d-flex flex-row align-items-center position-relative">
              <TextBox
                // value={password}
                type={showPassword ? 'text' : 'password'}
                name="password"
                className={`mb-0 pb-0 ${classes.validateField} ${
                  !isPasswordValid ? classes.invalidField : classes.validField
                } ${formErrors?.password.length ? 'is-invalid' : ''}`}
                placeholder="Must be 8 characters long"
                required
                ariaLabel="Please enter a password"
                onChange={onChangePassword}
                autoComplete="off"
                pattern="^(?=.{8,})"
              />
              {showPassword && <Icon type="eye" className={classes.eyeIcon} onClick={togglePasswordShow} />}
              {!showPassword && <Icon type="eyeClosed" className={classes.eyeIcon} onClick={togglePasswordShow} />}
            </div>
            {formErrors?.password.length === 0 && (
              <div className={classes.passwordChangeMessage}>{passwordChangeMessage}</div>
            )}
            {!isPasswordValid && formErrors?.password.length > 0 && (
              <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>
                {formErrors?.password.map(errors)}
              </div>
            )}
          </ValidateBackGround>
          <ValidateBackGround isValid={isConfirmedPasswordValid} className={classes.inputContainer}>
            <Label ariaLabel="Confirm Password" className={classes.emailLabel} htmlFor="confirm_password">
              Confirm Password
            </Label>
            <div className="d-flex flex-row align-items-center position-relative">
              <TextBox
                // value={confirmPassword}
                type={showPassword ? 'text' : 'password'}
                name="confirm_password"
                className={`${classes.validateField} ${
                  !isConfirmedPasswordValid ? classes.invalidField : classes.validField
                } ${!isConfirmedPasswordValid ? 'is-invalid' : ''}`}
                placeholder="Must be 8 characters long"
                required
                ariaLabel="Please enter a password"
                onChange={onChangeConfirmPassword}
                autoComplete="off"
                pattern="^(?=.{8,})"
              />
              {showPassword && <Icon type="eye" className={classes.eyeIcon} onClick={togglePasswordShow} />}
              {!showPassword && <Icon type="eyeClosed" className={classes.eyeIcon} onClick={togglePasswordShow} />}
            </div>
            {!isConfirmedPasswordValid && formErrors?.password.length > 0 && (
              <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>
                {formErrors?.password.map(errors)}
              </div>
            )}
          </ValidateBackGround>

          <div className="row">
            <div className="col">
              <div className={classes.buttonWrapper}>
                <PurpleButton type="button" onClick={onResetPasswordClick}>
                  Reset Password
                </PurpleButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </SignInWrapper>
);

const ResetPasswordMemo = memo(ResetPassword, areEqual);
export { ResetPasswordMemo as ResetPassword };
