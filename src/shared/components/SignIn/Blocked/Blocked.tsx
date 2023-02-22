import React, { memo } from 'react';
import { PurpleButton } from 'Components/Button';

import { areEqual } from 'Utils/equalityChecks';

import { SignInWrapper } from '../SignInWrapper';
import classes from './blocked.module.css';

interface Props {
  onButtonClick: (e: any) => void;
}

const Blocked = ({ onButtonClick }: Props) => (
  <SignInWrapper title="Welcome Back!">
    <div>
      <div className={classes.description}>
        <b>Welcome back to Company,</b>
        <br />
        We haven't seen you in a while, so your account has been paused.
        <br />
        Since you've been away we've been hard at work adding the following new features:
        <ul>
          <li>Damage Assessment</li>
        </ul>
        <br />
        Reactivate your account and our team will be in touch.
      </div>
      <br />
    </div>
    <div className={classes.buttonContainer}>
      <PurpleButton className={classes.button} onClick={onButtonClick}>
        Reactivate Account
      </PurpleButton>
    </div>
  </SignInWrapper>
);

const BlockedMemo = memo(Blocked, areEqual);

export { BlockedMemo as Blocked };
