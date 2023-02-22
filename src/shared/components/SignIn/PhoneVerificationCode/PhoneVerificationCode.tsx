import React, { memo, useEffect, useRef, useState } from 'react';

import { ValidateBackGround } from 'Components/Validation';
import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button/PurpleButton';
import { Anchor } from 'Components/Anchor';
import { formatPhoneInternationalWithCountryCode } from 'Utils/helpers';

import { SignInWrapper } from '../SignInWrapper';

import classes from './phoneVerificationCode.module.css';

interface Props {
  setCodeValue: any;
  phone: string;
  countryCode: string;
  companyName?: any;
  companyLogo?: any;
  onFormButtonClick: (e: any) => void;
  formErrors: any;
  fetching: boolean;
  goBack: (e: any) => void;
  resendCode: (e: any) => void;
  isButtonEnabled: boolean;
}

const PhoneVerificationCode = ({
  setCodeValue,
  phone,
  countryCode,
  companyName,
  companyLogo,
  onFormButtonClick,
  formErrors,
  fetching,
  goBack,
  resendCode,
  isButtonEnabled,
}: Props) => {
  // local variables
  const [code, setCode] = useState({
    first: '',
    second: '',
    third: '',
    fourth: '',
  });

  // refs
  const refs = {
    first: useRef(null),
    second: useRef(null),
    third: useRef(null),
    fourth: useRef(null),
  };

  // onChange we'll focus the next input
  const onChangeFirst = (e: any) => {
    const value: string = e.target.value.trim();

    if (value.length === 1) {
      refs.second.current.focus();
    }

    setCode({
      ...code,
      first: value,
    });
  };

  const onChangeSecond = (e: any) => {
    const value: string = e.target.value.trim();

    if (value.length === 1) {
      refs.third.current.focus();
    }

    setCode({
      ...code,
      second: e.target.value,
    });
  };

  const onChangeThird = (e: any) => {
    const value: string = e.target.value.trim();

    if (value.length === 1) {
      refs.fourth.current.focus();
    }

    setCode({
      ...code,
      third: e.target.value,
    });
  };

  const onChangeFourth = (e: any) => {
    setCode({
      ...code,
      fourth: e.target.value.trim(),
    });
  };

  // create the API code parameter value
  useEffect(() => {
    setCodeValue(`${code.first}${code.second}${code.third}${code.fourth}`);
  }, [code]);

  return (
    <SignInWrapper title="Verification" progress={75} companyName={companyName} companyLogo={companyLogo}>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3">
          <div className="row">
            <div className="col text-center">
              <p className={classes.description}>
                Please enter the 4-digit code sent to
                {` ${formatPhoneInternationalWithCountryCode(countryCode, phone)}`}
              </p>
              <Anchor onClick={goBack} className={classes.goBackLink}>
                Oops that's not my number
              </Anchor>

              <p className={classes.descriptionMessage}>
                Verifying your account lets you create projects and message others. It also helps keep your account
                secure
              </p>
            </div>
          </div>
          <form className={`requires-validation g3 ${classes.formBase}`} noValidate action="#">
            <div className={`d-flex flex-row justify-content-between ${classes.inputGroupBase}`}>
              <ValidateBackGround
                isValid={!formErrors?.code.length || !formErrors.message}
                className={classes.inputContainer}
              >
                <input
                  id="first"
                  value={code.first}
                  name="first"
                  maxLength={1}
                  type="text"
                  className={`form-control ${classes.validateField} ${
                    formErrors.message ? classes.invalidField : classes.validField
                  } ${formErrors.message ? 'is-invalid' : ''} ${
                    formErrors?.code.length ? classes.invalidField : classes.validField
                  } ${formErrors?.code.length ? 'is-invalid' : ''}`}
                  aria-label="Please enter the 4 digit code"
                  autoComplete="off"
                  onChange={onChangeFirst}
                />
              </ValidateBackGround>
              <ValidateBackGround
                isValid={!formErrors?.code.length || !formErrors.message}
                className={classes.inputContainer}
              >
                <input
                  id="second"
                  value={code.second}
                  name="second"
                  maxLength={1}
                  type="text"
                  className={`form-control ${classes.validateField} ${
                    formErrors.message ? classes.invalidField : classes.validField
                  } ${formErrors.message ? 'is-invalid' : ''} ${
                    formErrors?.code.length ? classes.invalidField : classes.validField
                  } ${formErrors?.code.length ? 'is-invalid' : ''}`}
                  ref={refs.second}
                  aria-label="Please enter the 4 digit code"
                  autoComplete="off"
                  onChange={onChangeSecond}
                />
              </ValidateBackGround>
              <ValidateBackGround
                isValid={!formErrors?.code.length || !formErrors.message}
                className={classes.inputContainer}
              >
                <input
                  id="third"
                  value={code.third}
                  name="third"
                  maxLength={1}
                  type="text"
                  className={`form-control ${classes.validateField} ${
                    formErrors.message ? classes.invalidField : classes.validField
                  } ${formErrors.message ? 'is-invalid' : ''} ${
                    formErrors?.code.length ? classes.invalidField : classes.validField
                  } ${formErrors?.code.length ? 'is-invalid' : ''}`}
                  ref={refs.third}
                  aria-label="Please enter the 4 digit code"
                  autoComplete="off"
                  onChange={onChangeThird}
                />
              </ValidateBackGround>
              <ValidateBackGround
                isValid={!formErrors?.code.length || !formErrors.message}
                className={classes.inputContainer}
              >
                <input
                  id="fourth"
                  value={code.fourth}
                  name="fourth"
                  maxLength={1}
                  type="text"
                  className={`form-control ${classes.validateField} ${
                    formErrors.message ? classes.invalidField : classes.validField
                  } ${formErrors.message ? 'is-invalid' : ''} ${
                    formErrors?.code.length ? classes.invalidField : classes.validField
                  } ${formErrors?.code.length ? 'is-invalid' : ''}`}
                  ref={refs.fourth}
                  aria-label="Please enter the 4 digit code"
                  autoComplete="off"
                  onChange={onChangeFourth}
                />
              </ValidateBackGround>
            </div>
            <div className="row">
              <div className="col text-center mt-1">
                {formErrors.message && (
                  <div className={`${classes.invalidFieldFeedback} invalid-feedback d-block`}>{formErrors.message}</div>
                )}
                {formErrors?.code.length ? (
                  <div className={`${classes.invalidFieldFeedback} invalid-feedback d-block`}>{formErrors.code[0]}</div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className={`d-flex flex-column ${classes.buttonContainer}`}>
              <PurpleButton type="submit" onClick={onFormButtonClick} disabled={isButtonEnabled || fetching}>
                Verify
              </PurpleButton>
            </div>
            <div className={`d-flex flex-column ${classes.buttonContainer}`}>
              <PurpleButton type="button" onClick={resendCode} disabled={fetching} outlined>
                Resend Code
              </PurpleButton>
            </div>
          </form>
        </div>
      </div>
    </SignInWrapper>
  );
};
PhoneVerificationCode.defaultProps = {
  companyName: undefined,
  companyLogo: undefined,
};
/*
  The error message will come in.  Need to handle empty password and incorrect credentials
*/
// This allows for default props if they exist
const PhoneVerificationCodeMemo = memo(PhoneVerificationCode, areEqual);

export { PhoneVerificationCodeMemo as PhoneVerificationCode };
