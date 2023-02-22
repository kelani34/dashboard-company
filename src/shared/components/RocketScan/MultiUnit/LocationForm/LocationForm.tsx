import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { PurpleButton } from 'Components/Button';
import { TextBox } from 'Components/TextBox';
import { CheckBox } from 'Components/CheckBox';
import { ValidateBackGround } from 'Components/Validation';

import { FloorDropDown } from 'Containers/FloorDropDown';
import classes from './locationForm.module.css';

interface Props {
  type: string;
  isCommercialProperty?: boolean;
  formType?: string;
  title: string;
  isCommercial?: boolean;
  isAccessible?: boolean;
  locationName: string;
  floorNumber: number;
  formErrors: any;
  fetching: boolean;
  hideDropDown: boolean;
  onLocationChange: (e: any) => void;
  onCommercialCheckboxClick?: (e: any) => void;
  onAccessibleCheckboxClick?: (e: any) => void;
  onFormButtonClick: (e: any) => void;
  setFloorNumber: (e: any) => void;
}

const LocationForm = ({
  type,
  isCommercialProperty,
  formType,
  title,
  isCommercial,
  isAccessible,
  locationName,
  floorNumber,
  formErrors,
  fetching,
  hideDropDown,
  onLocationChange,
  onCommercialCheckboxClick,
  onAccessibleCheckboxClick,
  onFormButtonClick,
  setFloorNumber,
}: Props) => (
  <div className="d-flex flex-column w-100">
    <form className={`requires-validation g3 ${classes.formBase}`} noValidate action="#">
      <div className="list-group">
        <div className={`${classes.formLabel} ${classes.indentedLabel}`}>Floor Number</div>
        <ValidateBackGround isValid={!formErrors?.floor.length}>
          <div
            className={`${classes.dropdownWrapper} ${classes.validateField} ${
              formErrors?.floor.length > 0 ? classes.invalidField : classes.validField
            } ${formErrors?.floor.length > 0 ? 'is-invalid' : ''}`}
          >
            <FloorDropDown floorNumber={floorNumber} setFloorNumber={setFloorNumber} hideDropDown={hideDropDown} />
          </div>
          <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>
            {formErrors?.floor.length > 0 ? formErrors.floor[0] : ''}
          </div>
        </ValidateBackGround>
        <div className={`${classes.formLabel} ${classes.indentedLabel} ${classes.floorNameField}`}>
          {`${title} Name / Number`}
        </div>
        <ValidateBackGround isValid={!formErrors?.name.length}>
          <TextBox
            name={`${type}Name`}
            type="text"
            value={locationName}
            ariaLabel={`Enter ${type} number or name`}
            onChange={onLocationChange}
            placeholder={`Enter ${type} number or name`}
            className={`${classes.validateField} ${
              formErrors?.name.length > 0 ? classes.invalidField : classes.validField
            } ${formErrors?.name.length > 0 ? 'is-invalid' : ''}`}
          />
          <div className={`${classes.invalidFieldFeedback} invalid-feedback`}>
            {formErrors?.name.length > 0 ? formErrors.name[0] : ''}
          </div>
        </ValidateBackGround>

        {type === 'unit' && !isCommercialProperty && (
          <div className={classes.checkboxContainer}>
            <div className={classes.formLabel}>{`Is this ${type} for commercial use?`}</div>
            <div className={`form-control ${classes.checkboxBackground}`}>
              <CheckBox checked={isCommercial} className={classes.inputText} onChange={onCommercialCheckboxClick} />
              <span className={classes.checkboxText}>{`This is a commercial ${type}`}</span>
            </div>
          </div>
        )}

        <div className={`${classes.checkboxContainer}`}>
          <div className={classes.formLabel}>
            {`Is this
           ${title} accessible?`}
          </div>
          <div className={`form-control ${classes.checkboxBackground}`}>
            <CheckBox checked={isAccessible} className={classes.inputText} onChange={onAccessibleCheckboxClick} />
            <span className={classes.checkboxText}>
              {`This
             ${title} is Inaccessible`}
            </span>
          </div>
        </div>
      </div>

      <div className={`d-flex mt-4 ${classes.buttonContainer}`}>
        <PurpleButton type="submit" onClick={onFormButtonClick} disabled={fetching}>
          {formType === 'edit' ? 'Save Changes' : `Create ${title}`}
        </PurpleButton>
      </div>
    </form>
  </div>
);

LocationForm.defaultProps = {
  isCommercialProperty: false,
  formType: undefined,
  isCommercial: false,
  isAccessible: true,
  onCommercialCheckboxClick: undefined,
  onAccessibleCheckboxClick: undefined,
};
const LocationFormMemo = memo(LocationForm, areEqual);

export { LocationFormMemo as LocationForm };
