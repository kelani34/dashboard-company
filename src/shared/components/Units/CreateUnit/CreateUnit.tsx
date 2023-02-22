import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";
import { Modal } from "Components/Modal";
import { PurpleButton } from "Components/Button";
import { TextBox } from "Components/TextBox";
import { CheckBox } from "Components/CheckBox";
import { ValidateBackGround } from "Components/Validation";

import classes from "./createUnit.module.css";

interface Props {
  isOpen?: boolean;
  checked: boolean;
  unitName: string;
  formErrors: any;
  fetching: boolean;
  onUnitChange: (e: any) => void;
  onCheckboxClick: (e: any) => void;
  onFormButtonClick: (e: any) => void;
}

const CreateUnit = ({
  isOpen = false,
  checked,
  unitName,
  formErrors,
  fetching,
  onUnitChange,
  onCheckboxClick,
  onFormButtonClick,
}: Props) => (
  <Modal
    id="createUnit"
    classes={classes}
    title="Create Unit"
    isOpen={isOpen}
    modalHeader
    dataBsBackdrop="static"
    dataBsKeyboard="false"
  >
    <div className="d-flex flex-column w-100">
      <form className={`requires-validation g3 ${classes.formBase}`} noValidate action="#">
        <div className="list-group">
          <div className={classes.formLabel}>Unit Number/Name</div>
          <ValidateBackGround isValid={!formErrors.name.length}>
            <TextBox
              name="unitName"
              type="text"
              value={unitName}
              ariaLabel="Enter unit number or name"
              onChange={onUnitChange}
              className={`${classes.validateField} ${
                formErrors?.name.length ? classes.invalidField : classes.validField
              } ${formErrors?.name.length ? "is-invalid" : ""}`}
            />
            <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>
              {formErrors?.name.length ? formErrors.name[0] : ""}
            </div>
          </ValidateBackGround>

          <div className={classes.checkboxContainer}>
            <div className={classes.formLabel}>Is This Unit Accessible?</div>
            <div className={`form-control ${classes.checkboxBackground}`}>
              <CheckBox checked={checked} className={classes.inputText} onChange={onCheckboxClick} />
              <span className={classes.checkboxText}>This unit is inaccessible</span>
            </div>
          </div>
        </div>

        <div className={`d-flex mt-4 ${classes.buttonContainer}`}>
          <PurpleButton type="submit" onClick={onFormButtonClick} disabled={fetching}>
            Create Unit
          </PurpleButton>
        </div>
      </form>
    </div>
  </Modal>
);

CreateUnit.defaultProps = {
  isOpen: false,
};

const CreateUnitMemo = memo(CreateUnit, areEqual);

export { CreateUnitMemo as CreateUnit };
