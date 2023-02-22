import React, { memo } from "react";
import { Icon } from "Components/Icons";

import { areEqual } from "Utils/equalityChecks";

import { SignInWrapper } from "../SignInWrapper";
import classes from "./welcomeAboard.module.css";

const WelcomeAboard = () => (
  <SignInWrapper title="Welcome Aboard!">
    <div>
      <div className={classes.image}>
        <Icon className="image" type="welcomeaboard" />
      </div>
      <p className={classes.description}>
        We received your request.
        <br />
        Our team will contact you shortly.
      </p>
    </div>
  </SignInWrapper>
);

const WelcomeAboardMemo = memo(WelcomeAboard, areEqual);

export { WelcomeAboardMemo as WelcomeAboard };
