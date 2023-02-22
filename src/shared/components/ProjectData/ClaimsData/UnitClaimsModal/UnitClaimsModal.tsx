import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';

import { Modal } from 'Components/Modal';
import { ValidateBackGround } from 'Components/Validation';
import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';
import { DeleteButton, PurpleButton } from 'Components/Button';
import { OptionsDropDown } from 'Containers/ProjectData';

import formClasses from 'Themes/form/form.module.css';
import classes from './unitClaimsModal.module.css';

interface Props {
  isOpen: boolean;
  isEditModal: boolean;
  units: any;
  selectedUnitId: number;
  selectedUnitName: string;
  setSelectedUnitId: any;
  selectedClaimTypeId: number;
  selectedClaimTypeName: string;
  setSelectedClaimTypeId: any;
  policyHolder: string;
  representative: string;
  policyNumber: string;
  claimNumber: string;
  claimTypes: any;
  formErrors: any;
  onChangePolicyHolder: (e: any) => void;
  onChangeRepresentative: (e: any) => void;
  onChangePolicyNumber: (e: any) => void;
  onChangeClaimNumber: (e: any) => void;
  onClickCloseModal: (e: any) => void;
  onDeleteButtonClick?: (e: any) => void;
  onCancelButtonClick: (e: any) => void;
  onAddButtonClick: (e: any) => void;
}

const UnitClaimsModal = ({
  isOpen = false,
  isEditModal,
  units,
  selectedUnitId,
  setSelectedUnitId,
  selectedUnitName,
  selectedClaimTypeId,
  selectedClaimTypeName,
  setSelectedClaimTypeId,
  policyHolder,
  representative,
  policyNumber,
  claimNumber,
  claimTypes,
  formErrors,
  onChangePolicyHolder,
  onChangeRepresentative,
  onChangePolicyNumber,
  onChangeClaimNumber,
  onClickCloseModal,
  onDeleteButtonClick,
  onCancelButtonClick,
  onAddButtonClick,
}: Props) => (
  <Modal
    id="unitClaimsModal"
    classes={classes}
    title={`${isEditModal ? 'Edit' : 'New'} Unit Claim`}
    isOpen={isOpen}
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalHeader
    modalCloseClick={onClickCloseModal}
  >
    <form className={classes.inputFields}>
      <ValidateBackGround isValid={!formErrors?.unitId.length} className={formClasses.inputContainer}>
        <OptionsDropDown
          className={classes.dropDown}
          label="Unit"
          placeHolder="Unit"
          items={units}
          optionSelectedId={selectedUnitId}
          optionSelectedName={selectedUnitName}
          setStatusSelected={setSelectedUnitId}
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.unitId.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.unitId?.[0]}
        </div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.policyHolder.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Policy Holder" className={formClasses.label}>
          Policy Holder
        </Label>
        <TextBox
          value={policyHolder}
          type="text"
          name="policy holder"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.policyHolder.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.policyHolder.length ? 'is-invalid' : ''}`}
          placeholder="Type Policy Holder Name"
          ariaLabel="Type Policy Holder Name"
          onChange={onChangePolicyHolder}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.policyHolder.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.policyHolder?.[0]}
        </div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.representative.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Representative" className={formClasses.label}>
          Representative
        </Label>
        <TextBox
          value={representative}
          type="text"
          name="representative"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.representative.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.representative.length ? 'is-invalid' : ''}`}
          placeholder="Type Representative Name"
          ariaLabel="Type Representative Name"
          onChange={onChangeRepresentative}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.representative.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.representative?.[0]}
        </div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.policyNumber.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Policy Number" className={formClasses.label}>
          Policy Number
        </Label>
        <TextBox
          value={policyNumber}
          type="text"
          name="policy number"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.policyNumber.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.policyNumber.length ? 'is-invalid' : ''}`}
          placeholder="Type Policy Number"
          ariaLabel="Type Policy Number"
          onChange={onChangePolicyNumber}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.policyNumber.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.policyNumber?.[0]}
        </div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.claimNumber.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Claim Number" className={formClasses.label}>
          Claim Number
        </Label>
        <TextBox
          value={claimNumber}
          type="text"
          name="claim number"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.claimNumber.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.claimNumber.length ? 'is-invalid' : ''}`}
          placeholder="Type Claim Number"
          ariaLabel="Type Claim Number"
          onChange={onChangeClaimNumber}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.claimNumber.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.claimNumber?.[0]}
        </div>
      </ValidateBackGround>
      <ValidateBackGround isValid={!formErrors?.claimType.length} className={formClasses.inputContainer}>
        <OptionsDropDown
          className={classes.dropDown}
          label="Claim Type"
          placeHolder="Claim Type"
          items={claimTypes}
          optionSelectedId={selectedClaimTypeId}
          optionSelectedName={selectedClaimTypeName}
          setStatusSelected={setSelectedClaimTypeId}
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.claimType.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.claimType?.[0]}
        </div>
      </ValidateBackGround>
      {isEditModal && (
        <DeleteButton className={classes.deleteButton} onClick={onDeleteButtonClick}>
          Delete Claim
        </DeleteButton>
      )}
      <div className={classes.buttons}>
        <PurpleButton className={classes.cancelButton} outlined onClick={onCancelButtonClick}>
          Cancel
        </PurpleButton>
        <PurpleButton className={classes.addButton} onClick={onAddButtonClick} disabled={!selectedUnitId}>
          {!isEditModal ? 'Add Claim' : 'Save'}
        </PurpleButton>
      </div>
    </form>
  </Modal>
);

UnitClaimsModal.defaultProps = {
  onDeleteButtonClick: undefined,
};

// This to allows default props
const UnitClaimsModalMemo = memo(UnitClaimsModal, areEqualShallow);

export { UnitClaimsModalMemo as UnitClaimsModal };
