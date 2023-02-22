import React, { memo } from 'react';
import InputMask from 'react-input-mask';
import { areEqual } from 'Utils/equalityChecks';

import { ValidateBackGround } from 'Components/Validation';
import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';
import { UploadAvatar } from 'Containers/User';
import { countries } from 'Utils/data';
import { CountryCodeSelector } from 'Components/SignIn/CountryCodeSelector';

import formClasses from 'Themes/form/form.module.css';
import classes from './editUserInfo.module.css';

interface Props {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  formErrors: any;
  countryId: number;
  countryCode: any;
  countryFlag: string;
  onChangeFirstName: (e: any) => void;
  onChangeLastName: (e: any) => void;
  onChangePhone: (e: any) => void;
  onChangeEmail: (e: any) => void;
}

const EditUserInfo = ({
  firstName,
  lastName,
  phone,
  email,
  formErrors,
  countryId,
  countryCode,
  countryFlag,
  onChangeFirstName,
  onChangeLastName,
  onChangePhone,
  onChangeEmail,
}: Props) => (
  <div className={classes.container}>
    <p className={classes.profilePicture}>Profile Picture</p>
    <UploadAvatar profile="user" />
    <div className={classes.inputFields}>
      <ValidateBackGround isValid={!formErrors?.firstName.length} className={formClasses.inputContainer}>
        <Label ariaLabel="First Name" className={formClasses.label}>
          First Name
        </Label>
        <TextBox
          value={firstName}
          type="text"
          name="first name"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.firstName.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.firstName.length ? 'is-invalid' : ''}`}
          placeholder="First Name"
          ariaLabel="Please enter your first name"
          onChange={onChangeFirstName}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.firstName.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.firstName?.[0]}
        </div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.lastName.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Last Name" className={formClasses.label}>
          Last Name
        </Label>
        <TextBox
          value={lastName}
          type="text"
          name="last name"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.lastName.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.lastName.length ? 'is-invalid' : ''}`}
          placeholder="Last Name"
          ariaLabel="Please enter your last name"
          onChange={onChangeLastName}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.lastName.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.lastName?.[0]}
        </div>
      </ValidateBackGround>
      <div className={classes.phoneInputs}>
        <div className={!formErrors?.phone.length ? classes.countrySelector : classes.countrySelectorError}>
          <CountryCodeSelector
            readOnly
            countries={countries}
            selectedCountryId={countryId}
            selectedCountryCode={countryCode}
            selectedCountryFlag={countryFlag}
          />
        </div>
        <ValidateBackGround
          isValid={!formErrors?.phone.length}
          className={`${formClasses.inputContainer} ${classes.phoneInputContainer}`}
        >
          <Label ariaLabel="Phone Number" className={formClasses.label}>
            Phone Number
          </Label>
          <br />
          <InputMask
            className={`mb-0 pb-0 ${classes.phoneInputField} ${formClasses.validateField} ${
              formErrors?.phone.length ? formClasses.invalidField : formClasses.validField
            } ${formErrors?.phone.length ? 'is-invalid' : ''}`}
            mask={phone}
            value={phone}
            placeholder="000 000 0000"
            maskChar={null}
            onChange={onChangePhone}
            autoComplete="off"
            disabled
          />
          <div
            className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
              formErrors?.phone.length ? 'd-block' : ''
            }`}
          >
            {formErrors?.phone?.[0]}
          </div>
        </ValidateBackGround>
      </div>
      <ValidateBackGround isValid={!formErrors?.email.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Phone Number" className={formClasses.label}>
          Work Email
        </Label>
        <TextBox
          value={email}
          type="text"
          name="email"
          className={`mb-0 pb-0 ${classes.disabledField} ${formClasses.validateField} ${
            formErrors?.email.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.email.length ? 'is-invalid' : ''}`}
          placeholder="Email"
          ariaLabel="Please enter your email"
          onChange={onChangeEmail}
          autoComplete="off"
          disabled
        />
        <div
          className={`${classes.invalidFieldFeedback} invalid-feedback ${formErrors?.email.length ? 'd-block' : ''}`}
        >
          {formErrors?.email?.[0]}
        </div>
      </ValidateBackGround>
    </div>
  </div>
);

const EditUserInfoMemo = memo(EditUserInfo, areEqual);

export { EditUserInfoMemo as EditUserInfo };
