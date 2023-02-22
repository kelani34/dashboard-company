import React, { memo } from 'react';

import { Icon } from 'Components/Icons';
import { ValidateBackGround } from 'Components/Validation';
import { areEqual } from 'Utils/equalityChecks';

import { AutoFocusInput } from 'Containers/AutoFocusInput';
import { Button } from 'Components/Button';
import classes from './addCustomForm.module.css';

interface Props {
  name?: string;
  iconRoom?: boolean;
  placeholderText: string;
  saveIcon: string;
  deleteIcon: string;
  isLevel?: boolean;
  isEditable?: boolean;
  canDelete?: boolean;
  isButtonEnable?: boolean;
  formErrors?: any;
  fetching?: boolean;
  onNameChange?: (e: any) => void;
  onDeleteButtonClick?: (e: any) => void;
  onSubmit?: (e: any) => void;
}

const AddCustomForm = ({
  name,
  iconRoom,
  placeholderText,
  saveIcon,
  deleteIcon,
  isLevel,
  isEditable,
  fetching,
  canDelete,
  isButtonEnable,
  formErrors,
  onNameChange,
  onDeleteButtonClick,
  onSubmit,
}: Props) => (
  <form className={classes.customForm}>
    <div className={classes.inputWrapper}>
      {iconRoom && <Icon type="customroom" className={classes.iconRoom} />}
      <ValidateBackGround
        isValid={!formErrors?.name?.length && !formErrors?.level?.length}
        className={`${classes.inputContainer}`}
      >
        <AutoFocusInput
          name="name"
          className={`${classes.inputBox} ${isLevel && classes.customLevelText}`}
          ariaLabel={placeholderText}
          autoFocus={isEditable}
          placeholder={placeholderText}
          value={name}
          onValueChange={onNameChange}
          isValid={formErrors?.name?.length > 0 || formErrors?.level?.length > 0}
        />
      </ValidateBackGround>
    </div>

    <div className={classes.editIcons}>
      {isEditable && (
        <Button
          className={classes.submitButton}
          onClick={onDeleteButtonClick}
          disabled={isButtonEnable || fetching || !canDelete}
          type="button"
        >
          <Icon type={deleteIcon} className={classes.delete} />
        </Button>
      )}
      <Button className={classes.submitButton} onClick={onSubmit} disabled={isButtonEnable || fetching} type="submit">
        <Icon type={saveIcon} />
      </Button>
    </div>
  </form>
);
AddCustomForm.defaultProps = {
  name: undefined,
  iconRoom: undefined,
  formErrors: undefined,
  onSubmit: undefined,
  isLevel: false,
  canDelete: false,
  isEditable: false,
  fetching: false,
  isButtonEnable: undefined,
  onNameChange: undefined,
  onDeleteButtonClick: undefined,
};
const AddCustomFormMemo = memo(AddCustomForm, areEqual);
export { AddCustomFormMemo as AddCustomForm };
