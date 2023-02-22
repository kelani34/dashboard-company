import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { ValidateBackGround } from 'Components/Validation';
import { TextBox } from 'Components/TextBox';
import { Label } from 'Components/Label';

import { OptionsDropDown } from 'Containers/ProjectData';
import { OptionToolBar } from 'Containers/OptionToolBar';

import formClasses from 'Themes/form/form.module.css';
import { CancelButton, PurpleButton } from 'Components/Button';

import classes from './propertyDataEdit.module.css';

interface Props {
  invalid?: boolean;
  formErrors: any;
  projectTypeOptions: any[];
  selectedProjectTypeName: string;
  classificationOptions: any[];
  classificationId: number;
  asbestosStatusOptions: any[];
  asbestosStatusInput: number;
  buildingNameInput: string;
  yearBuiltInput: string;
  setSelectedProjectTypeInput: (e: any) => void;
  setClassificationId: (e: any) => void;
  onChangeBuildingName: (e: any) => void;
  onChangeYearBuilt: (e: any) => void;
  setAsbestosStatusInput: (e: any) => void;
  onEditButtonClick: (e: any) => void;
  onSaveButtonClick: (e: any) => void;
}

const PropertyDataEdit = ({
  invalid,
  formErrors,
  projectTypeOptions,
  selectedProjectTypeName,
  classificationId,
  classificationOptions,
  asbestosStatusOptions,
  asbestosStatusInput,
  buildingNameInput,
  yearBuiltInput,
  setClassificationId,
  onChangeBuildingName,
  onChangeYearBuilt,
  setSelectedProjectTypeInput,
  setAsbestosStatusInput,
  onEditButtonClick,
  onSaveButtonClick,
}: Props) => (
  <form className={classes.propertyEditForm}>
    <OptionsDropDown
      className="project-type-selector"
      label="Project Type"
      placeHolder="a Project Type"
      items={projectTypeOptions}
      optionSelectedName={selectedProjectTypeName}
      setStatusSelected={setSelectedProjectTypeInput}
    />
    <div className={classes.toolBarWrapper}>
      <OptionToolBar
        idForLabel="classification-options"
        label="Project Classification"
        optionNames={classificationOptions}
        classificationId={classificationId}
        setClassificationId={setClassificationId}
      />
    </div>
    <OptionsDropDown
      className="asbestos-status-selector"
      label="Asbestos Status"
      placeHolder="Asbestos Status"
      items={asbestosStatusOptions}
      optionSelectedId={asbestosStatusInput}
      setStatusSelected={setAsbestosStatusInput}
    />
    <div className={classes.propertyDataInputWrapper}>
      <ValidateBackGround isValid={!formErrors?.yearBuilt.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Select a Year" htmlFor="year-built">
          Year Built (optional)
        </Label>
        <TextBox
          name="year-built"
          type="text"
          ariaLabel="Year Built"
          className={`${formClasses.validateField} ${invalid ? formClasses.invalidField : formClasses.validField}`}
          defaultValue={yearBuiltInput}
          onChange={onChangeYearBuilt}
          autoComplete="off"
          placeholder="Type a Year"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.yearBuilt.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.yearBuilt?.[0]}
        </div>
      </ValidateBackGround>
    </div>
    <div className={classes.propertyDataInputWrapper}>
      <ValidateBackGround isValid={!formErrors?.buildingName.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Building name" htmlFor="building-name">
          Building Name (optional)
        </Label>
        <TextBox
          name="building-name"
          type="text"
          ariaLabel="Name of Building"
          className={`${formClasses.validateField} ${invalid ? formClasses.invalidField : formClasses.validField}`}
          defaultValue={buildingNameInput}
          onChange={onChangeBuildingName}
          autoComplete="off"
          placeholder="Type Building Name"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.buildingName.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.buildingName?.[0]}
        </div>
      </ValidateBackGround>
    </div>
    <div className="d-flex justify-content-end align-items-center">
      <CancelButton className={classes.formFooterButton} onClick={onEditButtonClick}>
        Cancel
      </CancelButton>
      <PurpleButton type="submit" className={`${classes.formFooterButton}`} onClick={onSaveButtonClick}>
        Save
      </PurpleButton>
    </div>
  </form>
);
PropertyDataEdit.defaultProps = {
  invalid: undefined,
};
const PropertyDataEditMemo = memo(PropertyDataEdit, areEqual);

export { PropertyDataEditMemo as PropertyDataEdit };
