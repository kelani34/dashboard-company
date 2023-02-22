import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";
import { Modal } from "Components/Modal";
import { PurpleButton } from "Components/Button";
import { TextBox } from "Components/TextBox";
import { ValidateBackGround } from "Components/Validation";

import classes from "./createFloor.module.css";

interface Props {
  isOpen?: boolean;
  floorName: string;
  formErrors: any;
  fetching: boolean;
  onFloorChange: (e: any) => void;
  onFormButtonClick: (e: any) => void;
}

const CreateFloor = ({
  isOpen = false,
  floorName,
  formErrors,
  fetching,
  onFloorChange: onNameChange,
  onFormButtonClick,
}: Props) => (
  <Modal
    id="createFloor"
    classes={classes}
    title="Create Floor/Common Area"
    isOpen={isOpen}
    modalHeader
    dataBsBackdrop="static"
    dataBsKeyboard="false"
  >
    <div className="d-flex flex-column w-100">
      <form className={`requires-validation g3 ${classes.formBase}`} noValidate action="#">
        <div className="list-group">
          <div className={classes.formLabel}>Name</div>
          <ValidateBackGround isValid={!formErrors.name.length}>
            <TextBox
              name="floorName"
              type="text"
              value={floorName}
              ariaLabel="Enter floor or common area name"
              onChange={onNameChange}
              className={`${classes.validateField} ${
                formErrors?.name.length ? classes.invalidField : classes.validField
              } ${formErrors?.name.length ? "is-invalid" : ""}`}
            />
            <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>
              {formErrors?.name.length ? formErrors.name[0] : ""}
            </div>
          </ValidateBackGround>
        </div>

        <div className={`d-flex mt-4 ${classes.buttonContainer}`}>
          <PurpleButton type="submit" onClick={onFormButtonClick} disabled={fetching}>
            Create Area
          </PurpleButton>
        </div>
      </form>
    </div>
  </Modal>
);

CreateFloor.defaultProps = {
  isOpen: false,
};

const CreateFloorMemo = memo(CreateFloor, areEqual);

export { CreateFloorMemo as CreateFloor };
