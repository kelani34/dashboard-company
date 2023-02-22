import React, { memo } from 'react';
import InputMask from 'react-input-mask';
import { areEqual } from 'Utils/equalityChecks';

import { ValidateBackGround } from 'Components/Validation';
import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';
import { CountryAutocomplete, ProvinceAutocomplete } from 'Containers/Address';
import { UploadAvatar } from 'Containers/User';
import { countries } from 'Utils/data';
import { CountryCodeSelector } from 'Components/SignIn/CountryCodeSelector';

import formClasses from 'Themes/form/form.module.css';
import classes from './editCompanyInfo.module.css';

interface Props {
  companyName: string;
  companyPhone: string;
  companyWebsite: string;
  companyAddress: string;
  companyAddressSecond: string;
  companyCountry: string;
  companyState: string;
  companyCity: string;
  companyZip: string;
  formErrors: any;
  countryId: number;
  countryCode: any;
  countryFlag: string;
  onChangeCompanyName: (e: any) => void;
  onChangeCompanyPhone: (e: any) => void;
  onChangeCompanyWebsite: (e: any) => void;
  onChangeCompanyAddress: (e: any) => void;
  onChangeCompanyAddressSecond: (e: any) => void;
  setSelectedCountry: (e: any) => void;
  setSelectedProvince: (e: any) => void;
  onChangeCompanyCity: (e: any) => void;
  onChangeCompanyZip: (e: any) => void;
}

const EditCompanyInfo = ({
  companyName,
  companyPhone,
  companyWebsite,
  companyAddress,
  companyAddressSecond,
  companyCountry,
  companyState,
  companyCity,
  companyZip,
  formErrors,
  countryId,
  countryCode,
  countryFlag,
  onChangeCompanyName,
  onChangeCompanyPhone,
  onChangeCompanyWebsite,
  onChangeCompanyAddress,
  onChangeCompanyAddressSecond,
  setSelectedCountry,
  setSelectedProvince,
  onChangeCompanyCity,
  onChangeCompanyZip,
}: Props) => (
  <div className={classes.container}>
    <p className={classes.companyLogo}>Company Logo</p>
    <UploadAvatar profile="company" />
    <div className={classes.inputFields}>
      <ValidateBackGround isValid={!formErrors?.companyName.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Company Name" className={formClasses.label}>
          Company Name
        </Label>
        <TextBox
          value={companyName}
          type="text"
          name="company name"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.companyName.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.companyName.length ? 'is-invalid' : ''}`}
          placeholder="Company Name"
          ariaLabel="Please enter your company name"
          onChange={onChangeCompanyName}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.companyName.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.companyName?.[0]}
        </div>
      </ValidateBackGround>
      <div className={classes.phoneInputs}>
        <div className={!formErrors?.companyPhone.length ? classes.countrySelector : classes.countrySelectorError}>
          <CountryCodeSelector
            readOnly
            countries={countries}
            selectedCountryId={countryId}
            selectedCountryCode={countryCode}
            selectedCountryFlag={countryFlag}
          />
        </div>
        <ValidateBackGround
          isValid={!formErrors?.companyPhone.length}
          className={`${formClasses.inputContainer} ${classes.phoneInputContainer}`}
        >
          <Label ariaLabel="Company Phone Number" className={formClasses.label}>
            Company Phone Number
          </Label>
          <br />
          <InputMask
            className={`${classes.phoneInputField} ${formClasses.validateField} ${
              formErrors?.companyPhone.length ? formClasses.invalidField : formClasses.validField
            } ${formErrors?.companyPhone.length ? 'is-invalid' : ''}`}
            mask={companyPhone.toString}
            value={companyPhone}
            onChange={onChangeCompanyPhone}
            placeholder="000-000-0000"
            maskChar={null}
            autoComplete="off"
          />
          <div
            className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
              formErrors?.companyPhone.length ? 'd-block' : ''
            }`}
          >
            {formErrors?.companyPhone?.[0]}
          </div>
        </ValidateBackGround>
      </div>
      <ValidateBackGround isValid={!formErrors?.companyWebsite.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Company Website" className={formClasses.label}>
          Company Website
        </Label>
        <TextBox
          value={companyWebsite}
          type="text"
          name="company website"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.companyWebsite.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.companyWebsite.length ? 'is-invalid' : ''}`}
          placeholder="Company Website"
          ariaLabel="Please enter your company website"
          onChange={onChangeCompanyWebsite}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.companyWebsite.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.companyWebsite?.[0]}
        </div>
      </ValidateBackGround>
      <p className={classes.addressTitle}>Company Address </p>
      <ValidateBackGround isValid={!formErrors?.companyAddress.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Company Address" className={formClasses.label}>
          Address
        </Label>
        <TextBox
          value={companyAddress}
          type="text"
          name="company address"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.companyAddress.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.companyAddress.length ? 'is-invalid' : ''}`}
          placeholder="Company Address"
          ariaLabel="Please enter your company address"
          onChange={onChangeCompanyAddress}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.companyAddress.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.companyAddress?.[0]}
        </div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.companyAddressSecond.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Company Address Line 2" className={formClasses.label}>
          Address Line 2 (optional)
        </Label>
        <TextBox
          value={companyAddressSecond}
          type="text"
          name="company address line 2"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.companyAddressSecond.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.companyAddressSecond.length ? 'is-invalid' : ''}`}
          placeholder="Company Address Line 2"
          ariaLabel="Please enter your company address"
          onChange={onChangeCompanyAddressSecond}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.companyAddressSecond.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.companyAddressSecond?.[0]}
        </div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.companyCountry.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Country" className={formClasses.label} htmlFor="country">
          Country
        </Label>
        <CountryAutocomplete
          setSelectedCountry={setSelectedCountry}
          country={companyCountry}
          invalid={formErrors?.companyCountry.length}
          showCaretIcon
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.companyCountry.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.companyCountry?.[0]}
        </div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.companyState.length} className={formClasses.inputContainer}>
        <Label ariaLabel="State/Province" className={formClasses.label} htmlFor="state">
          State/Province
        </Label>
        <ProvinceAutocomplete
          setSelectedProvince={setSelectedProvince}
          state={companyState}
          invalid={formErrors?.companyState.length}
          showCaretIcon
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.companyState.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.companyState?.[0]}
        </div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.companyCity.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Company City" className={formClasses.label}>
          City
        </Label>
        <TextBox
          value={companyCity}
          type="text"
          name="company city"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.companyCity.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.companyCity.length ? 'is-invalid' : ''}`}
          placeholder="City"
          ariaLabel="Please enter your company city"
          onChange={onChangeCompanyCity}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.companyCity.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.companyCity?.[0]}
        </div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.companyZip.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Company Zip/Postal Code" className={formClasses.label}>
          Zip / Postal Code
        </Label>
        <TextBox
          value={companyZip}
          type="text"
          name="company zip/postal code"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.companyZip.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.companyZip.length ? 'is-invalid' : ''}`}
          placeholder="Zip / Postal Code"
          ariaLabel=""
          onChange={onChangeCompanyZip}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.companyZip.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.companyZip?.[0]}
        </div>
      </ValidateBackGround>
    </div>
  </div>
);

const EditCompanyInfoMemo = memo(EditCompanyInfo, areEqual);

export { EditCompanyInfoMemo as EditCompanyInfo };
