import { Anchor } from "Components/Anchor";
import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";
import classes from "./keepmesignedin.forgotpassword.module.css";

interface Props {
  onForgotPasswordClick: () => void;
}
const KeepMeSignedInForgotPassword = ({ onForgotPasswordClick }: Props) => (
  <div>
    <div className="row">
      <div className="col">
        <div className="d-flex">
          <div className={`form-check ${classes.signInForgotPasswordRow} ${classes.pointer}`}>
            <Anchor onClick={onForgotPasswordClick} className={classes.forgotPassword}>
              Forgot Password
            </Anchor>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const KeepMeSignedInForgotPasswordMemo = memo(KeepMeSignedInForgotPassword, areEqual);
export { KeepMeSignedInForgotPasswordMemo as KeepMeSignedInForgotPassword };
