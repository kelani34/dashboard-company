import React, { memo } from "react";

import { Label } from "Components/Label";
import { TextBox } from "Components/TextBox";
import { ValidateBackGround } from "Components/Validation";
import { Icon } from "Components/Icons";
import { areEqual } from "Utils/equalityChecks";
import { PurpleButton } from "Components/Button/PurpleButton";
import { KeepMeSignedInForgotPassword } from "../KeepMeSignedInForgotPassword";
import { SignInWrapper } from "../SignInWrapper";
import classes from "./signIn.email.module.css";

interface Props {
  isFormValid: boolean;
  isEmailValid: boolean;
  email: string;
  password: string;
  formErrorMessage: string;
  title: string;
  isButtonDisabled: boolean;
  showPassword: boolean;
  onFormButtonClick: (e: any) => void;
  onPasswordChange: (e: any) => void;
  onForgotPasswordClick: () => void;
  onChangeEmail: (e: any) => void;
  togglePasswordShow: (e: any) => void;
}
// the linter/ts/webpack requires an onChange event with an input, whether you need it or not
// const mockOnChange = () => {};
const SignInEmail = ({
  isEmailValid,
  isFormValid,
  email,
  password,
  formErrorMessage,
  title,
  isButtonDisabled,
  showPassword,
  onFormButtonClick,
  onPasswordChange,
  onForgotPasswordClick,
  onChangeEmail,
  togglePasswordShow,
}: Props) => (
  <SignInWrapper title={title}>
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3">
        <form className={`requires-validation g3 ${classes.signInForm}`} noValidate action="#">
          <ValidateBackGround isValid={isEmailValid} className={classes.inputContainer}>
            <Label ariaLabel="Email" className={classes.emailLabel} htmlFor="email">
              Email
            </Label>
            <TextBox
              value={email}
              type="text"
              name="email"
              className={`${
                isEmailValid ? `${classes.validateField} ${classes.validField}` : classes.invalidFieldTextBox
              }`}
              required
              ariaLabel={`An email address for ${email}`}
              onChange={onChangeEmail}
            />
            {/* <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>Please enter a valid email</div> */}
            <div
              className={`${isEmailValid ? classes.hideErrorMessage : classes.invalidField} ${
                classes.invalidFieldFeedback
              } `}
            >
              Please enter a valid email
            </div>
          </ValidateBackGround>
          <ValidateBackGround isValid={isFormValid} className={classes.inputContainer}>
            <Label ariaLabel="password" className={classes.emailLabel} htmlFor="email">
              Password
            </Label>
            <div className="d-flex flex-row align-items-center position-relative">
              <TextBox
                value={password}
                type={showPassword ? "text" : "password"}
                name="password"
                className={`${classes.validateField} ${!isFormValid ? classes.invalidField : classes.validField} ${
                  !isFormValid ? "is-invalid" : ""
                }`}
                placeholder="Enter Password"
                required
                ariaLabel="Please enter a password"
                onChange={onPasswordChange}
              />
              {showPassword && <Icon type="eye" className={classes.eyeIcon} onClick={togglePasswordShow} />}
              {!showPassword && <Icon type="eyeClosed" className={classes.eyeIcon} onClick={togglePasswordShow} />}
            </div>
            {/* <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>{formErrorMessage}</div> */}
            <div
              className={`${isFormValid ? classes.hideErrorMessage : classes.invalidField} ${
                classes.invalidFieldFeedback
              } `}
            >
              {formErrorMessage}
            </div>
          </ValidateBackGround>
          <div className={classes.desktopForgotPassword}>
            <KeepMeSignedInForgotPassword onForgotPasswordClick={onForgotPasswordClick} />
          </div>
          <div className="row">
            <div className={classes.signInMobile}>
              <div className="col d-flex justify-content-center align-items-center">
                <PurpleButton
                  className={classes.buttonWidth}
                  type="submit"
                  onClick={onFormButtonClick}
                  disabled={isButtonDisabled}
                >
                  Sign In
                </PurpleButton>
              </div>
            </div>
            <div className={classes.mobileForgotPassword}>
              <KeepMeSignedInForgotPassword onForgotPasswordClick={onForgotPasswordClick} />
            </div>
          </div>
        </form>
      </div>
    </div>
  </SignInWrapper>
);

/*
  The error message will come in.  Need to handle empty password and incorrect credentials
*/
// This allows for default props if they exist
const SignInEmailMemo = memo(SignInEmail, areEqual);

export { SignInEmailMemo as SignInEmail };
