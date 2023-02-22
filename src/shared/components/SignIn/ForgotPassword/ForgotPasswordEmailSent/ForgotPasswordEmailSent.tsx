import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button/PurpleButton';
import { SignInWrapper } from 'Components/SignIn/SignInWrapper';
import classes from './forgotPasswordEmailSent.module.css';

interface Props {
  message: string;
  resendEmail: (e: any) => void;
  returnToMainScreen: (e: any) => void;
}
const ForgotPasswordEmailSent = ({ message, resendEmail, returnToMainScreen }: Props) => (
  <SignInWrapper title="Forgot Password">
    <div className={`row ${classes.textTopPadding}`}>
      <div className="col">
        <div className="textAlignCenter">
          <span className={classes.text}>{message}</span>
        </div>
        <br />
        <div className="textAlignCenter">
          <span className={classes.text}>Didn't get an email?</span>
        </div>
      </div>
    </div>

    <div className={`d-flex flex-row justify-content-center w-100 ${classes.buttonRowTopPadding}`}>
      <div className={`col ${classes.buttonCol}`}>
        <PurpleButton type="button" onClick={resendEmail} outlined>
          Resend Email
        </PurpleButton>
      </div>
    </div>

    <div className={`d-flex flex-row justify-content-center w-100 ${classes.buttonRowTopPadding}`}>
      <div className={`col ${classes.buttonCol}`}>
        <PurpleButton type="button" onClick={returnToMainScreen} outlined>
          Back
        </PurpleButton>
      </div>
    </div>
  </SignInWrapper>
);

const ForgotPasswordEmailSentMemo = memo(ForgotPasswordEmailSent, areEqual);
export { ForgotPasswordEmailSentMemo as ForgotPasswordEmailSent };
