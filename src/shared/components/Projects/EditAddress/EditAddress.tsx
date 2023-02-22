import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { CountryAutocomplete, ProvinceAutocomplete } from 'Containers/Address';
import { Label } from 'Components/Label';
import { ValidateBackGround } from 'Components/Validation';
import { TextBox } from 'Components/TextBox';
import { PurpleButton } from 'Components/Button';

import classes from './editAddress.module.css';

interface Props {
  country: string;
  state: string;
  city: string;
  zip: string;
  streetAddress: string;
  unit: string;
  formErrors: any;
  onChangeCity: (e: any) => void;
  onChangeZip: (e: any) => void;
  onChangeStreetAddress: (e: any) => void;
  onChangeUnit: (e: any) => void;
  setSelectedCountry: (e: any) => void;
  setSelectedProvince: (e: any) => void;
  onFormButtonClick: (e: any) => void;
}

const EditAddress = ({
  country,
  state,
  city,
  zip,
  streetAddress,
  unit,
  formErrors,
  onChangeCity,
  onChangeZip,
  onChangeStreetAddress,
  onChangeUnit,
  setSelectedCountry,
  setSelectedProvince,
}: Props) => (
  <div className="d-flex flex-column w-100">
    <h6 className={classes.h6}>Address of Property Loss</h6>
    <form className={`requires-validation g3 ${classes.formBase}`} noValidate action="#">
      <ValidateBackGround isValid={!formErrors?.country.length} className={classes.inputContainer}>
        <Label ariaLabel="Country" className={classes.label} htmlFor="country">
          Country
        </Label>
        <CountryAutocomplete
          setSelectedCountry={setSelectedCountry}
          country={country}
          invalid={formErrors?.country.length}
        />
        <div
          className={`${classes.invalidFieldFeedback} invalid-feedback ${formErrors?.country.length ? 'd-block' : ''}`}
        >
          {formErrors?.country?.[0]}
        </div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.province.length} className={classes.inputContainer}>
        <Label ariaLabel="Province" className={classes.label} htmlFor="state">
          State/Province
        </Label>
        <ProvinceAutocomplete
          setSelectedProvince={setSelectedProvince}
          state={state}
          invalid={formErrors?.province.length}
        />
        <div
          className={`${classes.invalidFieldFeedback} invalid-feedback ${formErrors?.province.length ? 'd-block' : ''}`}
        >
          {formErrors?.province?.[0]}
        </div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.city.length} className={classes.inputContainer}>
        <Label ariaLabel="City" className={classes.label} htmlFor="city">
          City
        </Label>
        <TextBox
          value={city}
          name="city"
          type="text"
          className={`mb-0 pb-0 ${classes.validateField} ${
            formErrors?.city.length ? classes.invalidField : classes.validField
          } ${formErrors?.city.length ? 'is-invalid' : ''}`}
          required
          placeholder="ex. Los Angeles"
          ariaLabel="Please enter a city"
          onChange={onChangeCity}
          autoComplete="off"
        />
        <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>{formErrors?.city?.[0]}</div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.zip.length} className={classes.inputContainer}>
        <Label ariaLabel="Zip/Postal Code" className={classes.label} htmlFor="zip">
          Zip/Postal Code
        </Label>
        <TextBox
          value={zip}
          name="zip"
          type="text"
          className={`mb-0 pb-0 ${classes.validateField} ${
            formErrors?.zip.length ? classes.invalidField : classes.validField
          } ${formErrors?.zip.length ? 'is-invalid' : ''}`}
          required
          placeholder="ex. 12345"
          ariaLabel="Please enter a zip/postal code"
          onChange={onChangeZip}
          autoComplete="off"
        />
        <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>{formErrors?.zip?.[0]}</div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.streetAddress.length} className={classes.inputContainer}>
        <Label ariaLabel="Street Address" className={classes.label} htmlFor="address">
          Address
        </Label>
        <TextBox
          value={streetAddress}
          name="address"
          type="text"
          className={`mb-0 pb-0 ${classes.validateField} ${
            formErrors?.streetAddress.length ? classes.invalidField : classes.validField
          } ${formErrors?.streetAddress.length ? 'is-invalid' : ''}`}
          required
          placeholder="ex. 123 Main Street"
          ariaLabel="Please enter a street address"
          onChange={onChangeStreetAddress}
          autoComplete="off"
        />
        <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>{formErrors?.streetAddress?.[0]}</div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.unit.length} className={classes.inputContainer}>
        <Label ariaLabel="Address line 2 (optional)" className={classes.label} htmlFor="addressTwo">
          Address line 2 (optional)
        </Label>
        <TextBox
          value={unit}
          name="addressTwo"
          type="text"
          className={`mb-0 pb-0 ${classes.validateField} ${
            formErrors?.unit.length ? classes.invalidField : classes.validField
          } ${formErrors?.unit.length ? 'is-invalid' : ''}`}
          required
          placeholder="Apt/ Unit/ Floor"
          ariaLabel="Please enter a address line 2"
          onChange={onChangeUnit}
          autoComplete="off"
        />
        <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>{formErrors?.unit?.[0]}</div>
      </ValidateBackGround>
      <div className={`d-flex ${classes.buttonContainer}`}>
        {/* <PurpleButton type="submit" onClick={onFormButtonClick} disabled={isButtonEnabled || fetching}>
          Create Project
        </PurpleButton> */}
      </div>
    </form>
  </div>
);

const EditAddressMemo = memo(EditAddress, areEqual);

export { EditAddressMemo as EditAddress };
