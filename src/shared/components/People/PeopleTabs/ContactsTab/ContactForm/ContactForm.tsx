import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { ValidateBackGround } from 'Components/Validation';
import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';
import { DeleteButton, PurpleButton } from 'Components/Button';
import { Toggle } from 'Components/Toggle';
import { CountryCodeSelector } from 'Components/SignIn/CountryCodeSelector';

import InputMask from 'react-input-mask';

// css
import formClasses from 'Themes/form/form.module.css';
import { ContactTypeAutoComplete } from 'Containers/People/PeopleTabs/ContactsTab';
import classes from './contactForm.module.css';

interface Props {
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
  extension: string;
  email: string;
  contactType: number;
  isACompany: boolean;
  fetching: boolean;
  isButtonEnabled: boolean;
  submitButtonText?: string;
  formErrors: any;
  countries: any;
  selectedCountryId: number;
  selectedCountryCode: any;
  selectedCountryFlag: string;
  onChangeFirstName: (e: any) => void;
  onChangeLastName: (e: any) => void;
  onChangeCompanyName: (e: any) => void;
  onToggleCompany: (e: boolean) => void;
  onChangePhone: (e: any) => void;
  onChangeExtension: (e: any) => void;
  onChangeEmail: (e: any) => void;
  setContactType: (e: any) => void;
  onDeleteButtonClick?: (e: any) => void;
  onFormButtonClick: (e: any) => void;
}

const ContactForm = ({
  firstName,
  lastName,
  companyName,
  phone,
  extension,
  email,
  isACompany,
  contactType,
  fetching,
  isButtonEnabled,
  submitButtonText,
  formErrors,
  countries,
  selectedCountryId,
  selectedCountryCode,
  selectedCountryFlag,
  onChangeFirstName,
  onChangeLastName,
  onChangeCompanyName,
  onToggleCompany,
  onChangePhone,
  onChangeExtension,
  onChangeEmail,
  setContactType,
  onDeleteButtonClick,
  onFormButtonClick,
}: Props) => (
  <form className={`requires-validation g-3 ${formClasses.formBase}`} noValidate action="#">
    <ValidateBackGround isValid={!formErrors?.firstName.length} className={formClasses.inputContainer}>
      <Label ariaLabel="First Name" className={formClasses.label} htmlFor="firstName">
        First Name
      </Label>
      <TextBox
        value={firstName}
        name="firstName"
        type="text"
        className={`mb-0 pb-0 ${formClasses.validateField} ${
          formErrors?.firstName.length ? formClasses.invalidField : formClasses.validField
        } ${formErrors?.firstName.length ? 'is-invalid' : ''}`}
        required
        placeholder="ex. John"
        ariaLabel="Please enter first name"
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
      <Label ariaLabel="Last Name" className={formClasses.label} htmlFor="lastName">
        Last Name
      </Label>
      <TextBox
        value={lastName}
        name="lastName"
        type="text"
        className={`mb-0 pb-0 ${formClasses.validateField} ${
          formErrors?.lastName.length ? formClasses.invalidField : formClasses.validField
        } ${formErrors?.lastName.length ? 'is-invalid' : ''}`}
        required
        placeholder="ex. Smith"
        ariaLabel="Please enter last name"
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
    <ValidateBackGround isValid={!formErrors?.companyName.length} className={formClasses.inputContainer}>
      <Label ariaLabel="Company Name" className={formClasses.label} htmlFor="companyName">
        {`Company Name${isACompany ? '*' : ' (optional)'}`}
      </Label>
      <TextBox
        value={companyName}
        name="companyName"
        type="text"
        className={`mb-0 pb-0 ${formClasses.validateField} ${
          formErrors?.companyName.length ? formClasses.invalidField : formClasses.validField
        } ${formErrors?.companyName.length ? 'is-invalid' : ''}`}
        required
        placeholder="ex. Restoration 1 Inc"
        ariaLabel="Please enter a company name"
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
    <div className="d-flex w-100 justify-content-between align-items-center">
      <p className={classes.companyText}>This is a company</p>
      <Toggle onChange={onToggleCompany} checked={isACompany} />
    </div>
    <div className={classes.phoneInputs}>
      <div className={!formErrors?.phone.length ? classes.countrySelector : classes.countrySelectorError}>
        <CountryCodeSelector
          readOnly
          countries={countries}
          selectedCountryId={selectedCountryId}
          selectedCountryCode={selectedCountryCode}
          selectedCountryFlag={selectedCountryFlag}
        />
      </div>
      <ValidateBackGround
        isValid={!formErrors?.phone.length}
        className={`${formClasses.inputContainer} ${classes.phoneInputContainer}`}
      >
        <Label ariaLabel="Phone" className={formClasses.label} htmlFor="phone">
          Phone Number
        </Label>
        <br />
        <InputMask
          className={`${classes.maskInput} ${formClasses.validateField} ${
            formErrors?.phone.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.phone.length ? 'is-invalid' : ''}`}
          mask="999 999 9999"
          value={phone}
          onChange={onChangePhone}
          placeholder="000 000 0000"
          maskChar={null}
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
    <ValidateBackGround isValid={!formErrors.extension.length} className={formClasses.inputContainer}>
      <Label ariaLabel="Extension" className={formClasses.label} htmlFor="extension">
        Extension
      </Label>
      <TextBox
        value={extension}
        name="extension"
        type="number"
        className={`mb-0 pb-0 ${formClasses.validateField} ${
          formErrors.extension.length ? formClasses.invalidField : formClasses.validField
        } ${formErrors.extension.length ? 'is-invalid' : ''}`}
        required
        placeholder="ex. 123"
        ariaLabel="Please enter an phone extension"
        onChange={onChangeExtension}
        autoComplete="off"
      />
      <div
        className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
          formErrors.extension.length ? 'd-block' : ''
        }`}
      >
        {formErrors.extension?.[0]}
      </div>
    </ValidateBackGround>
    <ValidateBackGround isValid={!formErrors?.email.length} className={formClasses.inputContainer}>
      <Label ariaLabel="Email" className={formClasses.label} htmlFor="email">
        Email
      </Label>
      <TextBox
        value={email}
        name="email"
        type="email"
        className={`mb-0 pb-0 ${formClasses.validateField} ${
          formErrors?.email.length ? formClasses.invalidField : formClasses.validField
        } ${formErrors?.email.length ? 'is-invalid' : ''}`}
        required
        placeholder="example@email.com"
        ariaLabel="Please enter an email"
        onChange={onChangeEmail}
        autoComplete="off"
      />
      <div
        className={`${formClasses.invalidFieldFeedback} invalid-feedback ${formErrors?.email.length ? 'd-block' : ''}`}
      >
        {formErrors?.email?.[0]}
      </div>
    </ValidateBackGround>
    <ValidateBackGround isValid={!formErrors?.contactType.length} className={formClasses.inputContainer}>
      <Label ariaLabel="Email" className={formClasses.label} htmlFor="contactType">
        Contact Type (optional)
      </Label>
      <ContactTypeAutoComplete
        contactType={contactType}
        setSelectedContactType={setContactType}
        invalid={formErrors?.contactType.length > 0}
      />
      <div
        className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
          formErrors?.contactType.length ? 'd-block' : ''
        }`}
      >
        {formErrors?.contactType?.[0]}
      </div>
    </ValidateBackGround>
    <div className={`d-flex flex-column ${formClasses.buttonContainer}`}>
      {onDeleteButtonClick && (
        <DeleteButton
          className={classes.deleteButton}
          onClick={onDeleteButtonClick}
          disabled={isButtonEnabled || fetching}
        >
          Delete
        </DeleteButton>
      )}
      <PurpleButton type="submit" onClick={onFormButtonClick} disabled={isButtonEnabled || fetching}>
        {submitButtonText}
      </PurpleButton>
    </div>
  </form>
);

ContactForm.defaultProps = {
  onDeleteButtonClick: undefined,
  submitButtonText: 'Add Contact',
};

const ContactFormMemo = memo(ContactForm, areEqual);

export { ContactFormMemo as ContactForm };
