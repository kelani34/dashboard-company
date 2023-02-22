import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { SocialMedia } from 'Components/SocialMedia';

// Custom css
import { Form } from 'Containers/Form';
import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';
import { ValidateBackGround } from 'Components/Validation';
import classes from './signInHow.module.css';
import { SignInWrapper } from '../SignInWrapper';

interface Props {
  isFormValid: boolean;
  companyName?: any;
  companyLogo?: any;
  onClick: (e: any) => void;
  onKeyUp?: (e: any) => void;
  onFormSubmit: (formData: any) => void;
}

const SignInHow = ({ isFormValid, companyName, companyLogo, onClick, onKeyUp, onFormSubmit }: Props) => (
  <>
    <SignInWrapper title="Sign Up or Sign In" companyName={companyName} companyLogo={companyLogo}>
      <div className="row">
        <div className="col">
          <div className={`textAlignCenter  d-flex ${classes.crewIsWaitingContainer}`}>
            <p className={classes.crewIsWaiting}>
              Please enter your email. We’ll use it to either create your account or sign you in.
            </p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className={`col ${classes.formContainer}`}>
          <Form onSubmit={onFormSubmit} className="g3" noValidate>
            <ValidateBackGround isValid={isFormValid}>
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
          </Form>
        </div>
      </div>
      <div className={`d-flex flex-row justify-content-center w-100 ${classes.orRowTopPadding}`}>
        <div className={`${classes.hr}`}>
          <hr />
        </div>
        <span className={classes.or}>OR</span>
      </div>

      <div className="row">
        <div className="col">
          <SocialMedia onClick={onClick} onKeyUp={onKeyUp} />
        </div>
      </div>
    </SignInWrapper>
  </>
);

SignInHow.defaultProps = {
  companyName: undefined,
  companyLogo: undefined,
  onKeyUp: undefined,
};
const SignInHowMemo = memo(SignInHow, areEqual);
export { SignInHowMemo as SignInHow };
