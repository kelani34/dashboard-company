import React, { memo } from 'react';

import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';
import { ValidateBackGround } from 'Components/Validation';
import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button/PurpleButton';
import { Icon } from 'Components/Icons';
import { NewTabAnchor } from 'Components/Anchor/NewTabAnchor';
import { SignInWrapper } from '../SignInWrapper';

import classes from './signUpEmail.module.css';

interface Props {
  email: string;
  password: string;
  onChangePassword: (e: any) => void;
  confirmPassword: string;
  showPassword: boolean;
  passwordMatches: string;
  companyName?: any;
  companyLogo?: any;
  onChangeConfirmPassword: (e: any) => void;
  togglePasswordShow: (e: any) => void;
  onFormButtonClick: (e: any) => void;
  formErrors: any;
  fetching: boolean;
  isButtonEnabled: boolean;
}

// the linter/ts/webpack requires an onChange event with an input, whether you need it or not
const mockOnChange = () => {};

const SignUpEmail = ({
  email,
  password,
  companyName,
  companyLogo,
  onChangePassword,
  confirmPassword,
  onChangeConfirmPassword,
  showPassword,
  passwordMatches,
  togglePasswordShow,
  onFormButtonClick,
  formErrors,
  fetching,
  isButtonEnabled,
}: Props) => (
  <SignInWrapper title="Sign Up" progress={25} companyName={companyName} companyLogo={companyLogo}>
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3">
        <form className={`requires-validation g3 ${classes.formBase}`} noValidate action="#">
          <ValidateBackGround isValid={!formErrors?.email.length} className={classes.inputContainer}>
            <Label ariaLabel="Email" className={classes.emailLabel} htmlFor="email">
              Email
            </Label>
            <TextBox
              value={email}
              type="email"
              name="email"
              className={`${classes.validateField} ${
                formErrors?.email.length ? classes.invalidField : classes.validField
              } ${formErrors?.email.length ? 'is-invalid' : ''}`}
              placeholder="john.smith@email.com"
              required
              ariaLabel="Please enter an email address"
              onChange={mockOnChange}
            />
            <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>
              {formErrors?.email.length ? formErrors.email[0] : ''}
            </div>
          </ValidateBackGround>
          <ValidateBackGround isValid={!formErrors?.password.length} className={classes.inputContainer}>
            <Label ariaLabel="Password" className={classes.emailLabel} htmlFor="Password">
              Password
            </Label>
            <div className="d-flex flex-row align-items-center position-relative">
              <TextBox
                value={password}
                type={showPassword ? 'text' : 'password'}
                name="password"
                className={`mb-0 pb-0 ${classes.validateField} ${
                  formErrors?.password.length ? classes.invalidField : classes.validField
                } ${formErrors?.password.length ? 'is-invalid' : ''}`}
                placeholder="Must be 8 characters long"
                required
                ariaLabel="Please enter a password"
                onChange={onChangePassword}
                autoComplete="off"
              />
              {showPassword && <Icon type="eye" className={classes.eyeIcon} onClick={togglePasswordShow} />}
              {!showPassword && <Icon type="eyeClosed" className={classes.eyeIcon} onClick={togglePasswordShow} />}
            </div>
            <p className={classes.passwordTip}>A good password contains a mix of letters, numbers and symbols</p>
            {formErrors?.password.length
              ? formErrors?.password.map((error: string) => (
                  <div
                    key={error}
                    className={`${classes.invalidFieldFeedback} invalid-feedback ${error ? 'd-block' : ''}`}
                  >
                    {error}
                  </div>
                ))
              : ''}
          </ValidateBackGround>
          <ValidateBackGround isValid={passwordMatches !== 'not-match'} className={classes.inputContainer}>
            <Label ariaLabel="Confirm Password" className={classes.emailLabel} htmlFor="confirm_password">
              Confirm Password
            </Label>
            <div className="d-flex flex-row align-items-center position-relative">
              <TextBox
                value={confirmPassword}
                type={showPassword ? 'text' : 'password'}
                name="confirm_password"
                className={`${classes.validateField} ${
                  passwordMatches === 'not-match' ? classes.invalidField : classes.validField
                } ${passwordMatches === 'not-match' ? 'is-invalid' : ''}`}
                placeholder="Must be 8 characters long"
                required
                ariaLabel="Please enter a password"
                onChange={onChangeConfirmPassword}
                autoComplete="off"
              />
              {showPassword && <Icon type="eye" className={classes.eyeIcon} onClick={togglePasswordShow} />}
              {!showPassword && <Icon type="eyeClosed" className={classes.eyeIcon} onClick={togglePasswordShow} />}
            </div>
            <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>
              {formErrors?.confirm_password?.[0]}
            </div>
          </ValidateBackGround>
          {passwordMatches === 'match' && <div className={classes.passwordMatchesSuccess}>Passwords Match</div>}
          {passwordMatches === 'not-match' && <div className={classes.passwordMatchesError}>Passwords Don't Match</div>}
          <p className={classes.termsText}>
            By signing up, you agree to receive updates and special offers regarding RocketPlan’s product and services.
            You may unsubscribe from these at any time.{' '}
          </p>
          <p className={classes.termsText}>
            View our <NewTabAnchor href="https://company.com/privacy-policy/">Privacy Policy</NewTabAnchor> and{' '}
            <NewTabAnchor href="https://company.com/terms-and-conditions/">Terms and Conditions</NewTabAnchor>
          </p>
          <div className={`d-flex ${classes.buttonContainer}`}>
            <PurpleButton type="submit" onClick={onFormButtonClick} disabled={isButtonEnabled || fetching}>
              Next, Verification
            </PurpleButton>
          </div>
        </form>
      </div>
    </div>
  </SignInWrapper>
);
SignUpEmail.defaultProps = {
  companyName: undefined,
  companyLogo: undefined,
};
/*
  The error message will come in.  Need to handle empty password and incorrect credentials
*/
// This allows for default props if they exist
const SignUpEmailMemo = memo(SignUpEmail, areEqual);

export { SignUpEmailMemo as SignUpEmail };
