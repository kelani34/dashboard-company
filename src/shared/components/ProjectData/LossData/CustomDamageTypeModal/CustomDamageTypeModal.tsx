import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Modal } from 'Components/Modal';
import { PurpleButton } from 'Components/Button';
import { TextBox } from 'Components/TextBox';
import { ValidateBackGround } from 'Components/Validation';

import classes from './customDamageTypeModal.module.css';

interface Props {
  typeName: string;
  isOpen: boolean;
  isButtonEnabled: boolean;
  errors: any;
  onFormSubmit: (e: any) => void;
  onCloseClick: (e: any) => void;
  onTypeNameChange: (e: any) => void;
}

const CustomDamageTypeModal = ({
  typeName,
  isOpen,
  isButtonEnabled,
  errors,
  onFormSubmit,
  onCloseClick,
  onTypeNameChange,
}: Props) => (
  <Modal
    id="custom-damage-type-modal"
    classes={classes}
    title="Custom Damage Type"
    isOpen={isOpen}
    modalHeader
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={onCloseClick}
  >
    <div>Make custom damage types to cover cases like Monsoons.</div>

    <div className={classes.formLabel}>Custom Damage Type Name</div>
    <ValidateBackGround isValid={!errors?.name.length}>
      <TextBox
        name="typeName"
        type="text"
        value={typeName}
        ariaLabel="Enter custom damage type name"
        placeholder="E.G Monsoon"
        onChange={onTypeNameChange}
        className={`${classes.validateField} ${errors?.name.length ? classes.invalidField : classes.validField} ${
          errors?.name.length ? 'is-invalid' : ''
        }`}
      />
      <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>
        {errors?.name.length > 0 ? errors.name[0] : ''}
      </div>
    </ValidateBackGround>

    <div className={classes.buttonWrapper}>
      <PurpleButton outlined className={classes.button} onClick={onCloseClick}>
        Cancel
      </PurpleButton>
      <PurpleButton className={classes.button} disabled={isButtonEnabled} onClick={onFormSubmit}>
        Create
      </PurpleButton>
    </div>
  </Modal>
);

const CustomDamageTypeModalMemo = memo(CustomDamageTypeModal, areEqual);
export { CustomDamageTypeModalMemo as CustomDamageTypeModal };
