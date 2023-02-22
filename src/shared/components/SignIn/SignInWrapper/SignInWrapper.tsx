import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { CompanyHeader } from 'Components/CompanyHeader';
import { ProgressBar } from 'Components/ProgressBar';
import { CompanyInviteBanner } from 'Components/SignIn';
import classes from './signIn.wrapper.module.css';

interface Props {
  title: string;
  progress?: number;
  companyName?: any;
  companyLogo?: any;
  children: any;
}

const SignInWrapper = ({ title, progress, companyName, companyLogo, children }: Props) => (
  <>
    {progress && <ProgressBar max={progress} />}

    {companyName && (
      <div className="row">
        <div className="col">
          <CompanyInviteBanner companyName={companyName} companyLogo={companyLogo} />
        </div>
      </div>
    )}

    <div className={`container-fluid ${classes.signInWrapperBase}`}>
      <div className="row">
        <div className="col">
          <div className={classes.svgRocketContainer}>
            <CompanyHeader iconClassName={classes.svgRocket} iconType="logoMobile" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="w-100 text-center d-block">
            <h2 className={classes.title}>{title}</h2>
          </div>
        </div>
      </div>
      {children}
    </div>
  </>
);

SignInWrapper.defaultProps = {
  progress: undefined,
  companyName: undefined,
  companyLogo: undefined,
};

/*
  The error message will come in.  Need to handle empty password and incorrect credentials
*/
// This allows for default props if they exist
const SignInWrapperMemo = memo(SignInWrapper, areEqual);

export { SignInWrapperMemo as SignInWrapper };
