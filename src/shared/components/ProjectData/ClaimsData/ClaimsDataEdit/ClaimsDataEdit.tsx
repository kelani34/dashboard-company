import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';
import { CancelButton, PurpleButton } from 'Components/Button';

import formClasses from 'Themes/form/form.module.css';
import classes from './claimsDataEdit.module.css';

interface Props {
  policyHolder: string;
  representative: string;
  provider: string;
  policyNumber: string;
  claimNumber: string;
  onChangePolicyHolder: (e: any) => void;
  onChangeRepresentative: (e: any) => void;
  onChangeProvider: (e: any) => void;
  onChangePolicyNumber: (e: any) => void;
  onChangeClaimNumber: (e: any) => void;
  onCancelButtonClick: (e: any) => void;
  onSaveButtonClick: (e: any) => void;
}

const ClaimsDataEdit = ({
  policyHolder,
  representative,
  provider,
  policyNumber,
  claimNumber,
  onChangePolicyHolder,
  onChangeRepresentative,
  onChangeProvider,
  onChangePolicyNumber,
  onChangeClaimNumber,
  onCancelButtonClick,
  onSaveButtonClick,
}: Props) => (
  <form className={`d-flex flex-column w-100 ${classes.editBase}`}>
    <div className={classes.inputFields}>
      <div className={classes.claimsDataInputWrapper}>
        <Label ariaLabel="Policy Holder" className={formClasses.label}>
          Policy Holder
        </Label>
        <TextBox
          value={policyHolder}
          type="text"
          name="policy holder"
          className={`${formClasses.validateField} ${formClasses.validField}`}
          placeholder="Type Policy Holder Name"
          ariaLabel="Type Policy Holder Name"
          onChange={onChangePolicyHolder}
          autoComplete="off"
        />
      </div>
      <div className={classes.claimsDataInputWrapper}>
        <Label ariaLabel="Representative" className={formClasses.label}>
          Representative
        </Label>
        <TextBox
          value={representative}
          type="text"
          name="representative"
          className={`${formClasses.validateField} ${formClasses.validField}`}
          placeholder="Type Representative Name"
          ariaLabel="Type Representative Name"
          onChange={onChangeRepresentative}
          autoComplete="off"
        />
      </div>
      <div className={classes.claimsDataInputWrapper}>
        <Label ariaLabel="Provider" className={formClasses.label}>
          Provider
        </Label>
        <TextBox
          value={provider}
          type="text"
          name="provider"
          className={`${formClasses.validateField} ${formClasses.validField}`}
          placeholder="Type Provider Name"
          ariaLabel="Type Provider Name"
          onChange={onChangeProvider}
          autoComplete="off"
        />
      </div>
      <div className={classes.claimsDataInputWrapper}>
        <Label ariaLabel="Policy Number" className={formClasses.label}>
          Policy Number
        </Label>
        <TextBox
          value={policyNumber}
          type="text"
          name="policy number"
          className={`${formClasses.validateField} ${formClasses.validField}`}
          placeholder="Type Policy Number"
          ariaLabel="Type Policy Number"
          onChange={onChangePolicyNumber}
          autoComplete="off"
        />
      </div>
      <div className={classes.claimsDataInputWrapper}>
        <Label ariaLabel="Claim Number" className={formClasses.label}>
          Claim Number
        </Label>
        <TextBox
          value={claimNumber}
          type="text"
          name="claim number"
          className={`${formClasses.validateField} ${formClasses.validField}`}
          placeholder="Type Claim Number"
          ariaLabel="Type Claim Number"
          onChange={onChangeClaimNumber}
          autoComplete="off"
        />
      </div>
      <div className="d-flex justify-content-end align-items-center">
        <CancelButton className={classes.formFooterButton} onClick={onCancelButtonClick}>
          Cancel
        </CancelButton>
        <PurpleButton type="submit" className={`${classes.formFooterButton}`} onClick={onSaveButtonClick}>
          Save
        </PurpleButton>
      </div>
    </div>
  </form>
);

const ClaimsDataEditMemo = memo(ClaimsDataEdit, areEqual);

export { ClaimsDataEditMemo as ClaimsDataEdit };
