import React, { memo } from 'react';

import { Label } from 'Components/Label';
import { ValidateBackGround } from 'Components/Validation';
import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button/PurpleButton';
import InputMask from 'react-input-mask';
import { SignInWrapper } from '../SignInWrapper';
import { CountryCodeSelector } from '../CountryCodeSelector';

import classes from './phoneVerification.module.css';

interface Props {
  phone: string;
  companyName?: any;
  companyLogo?: any;
  isEmployeeSignUp?: boolean;
  onChangePhone: (e: any) => void;
  onFormButtonClick: (e: any) => void;
  formErrors: any;
  fetching: boolean;
  isButtonEnabled: boolean;
  countryCodeSelectorIsOpen: boolean;
  countryCodeSelectOnChange: (e: any) => void;
  countryCodetoggleOpenCloseOnClick: (e: any) => void;
  countryCodeCountries: any;
  selectedCountryId: number;
  selectedCountryCode: number;
  selectedCountryFlag: string;
}

const PhoneVerification = ({
  phone,
  companyName,
  companyLogo,
  isEmployeeSignUp,
  onChangePhone,
  onFormButtonClick,
  formErrors,
  fetching,
  isButtonEnabled,
  countryCodeSelectorIsOpen,
  countryCodeSelectOnChange,
  countryCodetoggleOpenCloseOnClick,
  countryCodeCountries,
  selectedCountryId,
  selectedCountryCode,
  selectedCountryFlag,
}: Props) => (
  <SignInWrapper title="Verification" progress={50} companyName={companyName} companyLogo={companyLogo}>
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3">
        <div className="row">
          <div className="col">
            <p className={classes.description}>
              Verifying your account lets you create projects and message others. It also help keep your account secure.
            </p>
          </div>
        </div>
        <form className={`requires-validation g3 ${classes.formBase}`} noValidate action="#">
          <div className={classes.phoneInputs}>
            <div className={!formErrors?.phone.length ? classes.countrySelector : classes.countrySelectorError}>
              <CountryCodeSelector
                isOpen={countryCodeSelectorIsOpen}
                onChange={countryCodeSelectOnChange}
                onClick={countryCodetoggleOpenCloseOnClick}
                readOnly={isEmployeeSignUp}
                countries={countryCodeCountries}
                selectedCountryId={selectedCountryId}
                selectedCountryCode={selectedCountryCode}
                selectedCountryFlag={selectedCountryFlag}
              />
            </div>
            <ValidateBackGround isValid={!formErrors?.phone.length} className={classes.inputContainer}>
              <Label ariaLabel="Phone" className={classes.emailLabel} htmlFor="phone">
                Mobile Phone Number
              </Label>
              <br />
              <InputMask
                className={`${classes.validateField} ${
                  formErrors?.phone.length ? classes.invalidField : classes.validField
                } ${formErrors?.phone.length ? 'is-invalid' : ''}`}
                mask="999 999 9999"
                value={phone}
                onChange={onChangePhone}
                placeholder="000 000 0000"
                maskChar={null}
              />
              <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>
                {formErrors?.phone.length ? formErrors.phone[0] : ''}
              </div>
            </ValidateBackGround>
          </div>
          <div className={`d-flex ${classes.buttonContainer}`}>
            <PurpleButton type="submit" onClick={onFormButtonClick} disabled={isButtonEnabled || fetching}>
              Send Verification Code
            </PurpleButton>
          </div>
        </form>
      </div>
    </div>
  </SignInWrapper>
);

PhoneVerification.defaultProps = {
  companyName: undefined,
  companyLogo: undefined,
  isEmployeeSignUp: false,
};
/*
  The error message will come in.  Need to handle empty password and incorrect credentials
*/
// This allows for default props if they exist
const PhoneVerificationMemo = memo(PhoneVerification, areEqual);

export { PhoneVerificationMemo as PhoneVerification };
