import React, { memo } from 'react';

import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';
import { ValidateBackGround } from 'Components/Validation';
import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button/PurpleButton';
import { SignInWrapper } from '../SignInWrapper';

import classes from './signUpUserInformation.module.css';

interface Props {
  firstName: string;
  lastName: string;
  companyName: string;
  companyInviteName?: any;
  companyLogo?: any;
  isUserInvited: boolean;
  onChangeFirstName: (e: any) => void;
  onChangeLastName: (e: any) => void;
  onChangeCompanyName: (e: any) => void;
  onFormButtonClick: (e: any) => void;
  formErrors: any;
  fetching: boolean;
  isButtonEnabled: boolean;
}

const SignUpUserInformation = ({
  firstName,
  lastName,
  companyName,
  companyInviteName,
  companyLogo,
  isUserInvited,
  onChangeFirstName,
  onChangeLastName,
  onChangeCompanyName,
  onFormButtonClick,
  formErrors,
  fetching,
  isButtonEnabled,
}: Props) => (
  <SignInWrapper title="Final Details" progress={100} companyName={companyInviteName} companyLogo={companyLogo}>
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3">
        <form className={`requires-validation g3 ${classes.formBase}`} noValidate action="#">
          <ValidateBackGround isValid={!formErrors?.firstName.length} className={classes.inputContainer}>
            <Label ariaLabel="First Name" className={classes.emailLabel} htmlFor="first_name">
              First Name
            </Label>
            <TextBox
              value={firstName}
              type="text"
              name="first_name"
              className={`${classes.validateField} ${
                formErrors?.firstName.length ? classes.invalidField : classes.validField
              } ${formErrors?.firstName.length ? 'is-invalid' : ''}`}
              placeholder="ex. John"
              onChange={onChangeFirstName}
              autoComplete="off"
              ariaLabel="Please enter the first name"
            />
            <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>
              {formErrors?.firstName.length ? formErrors.firstName[0] : ''}
            </div>
          </ValidateBackGround>
          <ValidateBackGround isValid={!formErrors?.lastName.length} className={classes.inputContainer}>
            <Label ariaLabel="Last Name" className={classes.emailLabel} htmlFor="last_name">
              Last Name
            </Label>
            <TextBox
              value={lastName}
              type="text"
              name="last_name"
              className={`${classes.validateField} ${
                formErrors?.lastName.length ? classes.invalidField : classes.validField
              } ${formErrors?.lastName.length ? 'is-invalid' : ''}`}
              placeholder="ex. Smith"
              onChange={onChangeLastName}
              autoComplete="off"
              ariaLabel="Please enter the last name"
            />
            <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>
              {formErrors?.lastName.length ? formErrors.lastName[0] : ''}
            </div>
          </ValidateBackGround>
          {!isUserInvited && (
            <ValidateBackGround isValid={!formErrors?.companyName.length} className={classes.inputContainer}>
              <Label ariaLabel="Company Name" className={classes.emailLabel} htmlFor="company_name">
                Company Name
              </Label>
              <TextBox
                value={companyName}
                type="text"
                name="company_name"
                className={`${classes.validateField} ${
                  formErrors?.companyName.length ? classes.invalidField : classes.validField
                } ${formErrors?.companyName.length ? 'is-invalid' : ''}`}
                placeholder="ex. Restoration 1 Inc"
                onChange={onChangeCompanyName}
                autoComplete="off"
                ariaLabel="Please enter the company name"
              />
              <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>
                {formErrors?.companyName.length ? formErrors.companyName[0] : ''}
              </div>
            </ValidateBackGround>
          )}
          <div className={`d-flex ${classes.buttonContainer}`}>
            <PurpleButton type="submit" onClick={onFormButtonClick} disabled={isButtonEnabled || fetching}>
              Ready to Go!
            </PurpleButton>
          </div>
        </form>
      </div>
    </div>
  </SignInWrapper>
);
SignUpUserInformation.defaultProps = {
  companyInviteName: undefined,
  companyLogo: undefined,
};
/*
  The error message will come in.  Need to handle empty password and incorrect credentials
*/
// This allows for default props if they exist
const SignUpUserInformationMemo = memo(SignUpUserInformation, areEqual);

export { SignUpUserInformationMemo as SignUpUserInformation };
