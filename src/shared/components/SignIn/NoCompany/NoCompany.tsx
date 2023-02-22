import React, { memo } from "react";
import { Icon } from "Components/Icons";

import { areEqual } from "Utils/equalityChecks";

import { SignInWrapper } from "../SignInWrapper";
import classes from "./noCompany.module.css";

const NoCompany = () => (
  <SignInWrapper title="Don't See Your Company?">
    <div>
      <div className={classes.image}>
        <Icon className="image" type="nocompany" />
      </div>
      <p className={classes.description}>
        If you don't see your company, please request your manager to send another link to you. The app will use it to
        connect you to your company.
      </p>
    </div>
  </SignInWrapper>
);

const NoCompanyMemo = memo(NoCompany, areEqual);

export { NoCompanyMemo as NoCompany };
