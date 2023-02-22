import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import formClasses from 'Themes/form/form.module.css';
import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';
import { ValidateBackGround } from 'Components/Validation';
import { ReportLocations } from 'Containers/ReportsAndDocuments';

import { PurpleButton, RadioButton } from 'Components/Button';
import classes from './dryingReportForm.module.css';

interface Props {
  title: string;
  showExternal: string;
  showInternal: string;
  showMaterialMoisture: string;
  showEquipment: string;
  unitType: string;
  formErrors: any;
  fetching: boolean;
  onChangeTitle: (e: any) => void;
  onExternalClick: (e: any) => void;
  onInternalClick: (e: any) => void;
  onMaterialMoistureClick: (e: any) => void;
  onEquipmentClick: (e: any) => void;
  onUnitTypeClick: (e: any) => void;
  onFormSubmit: (e: any) => void;
}

const DryingReportForm = ({
  title,
  showExternal,
  showInternal,
  showMaterialMoisture,
  showEquipment,
  unitType,
  formErrors,
  fetching,
  onChangeTitle,
  onExternalClick,
  onInternalClick,
  onMaterialMoistureClick,
  onEquipmentClick,
  onUnitTypeClick,
  onFormSubmit,
}: Props) => (
  <div className={classes.generateReportsForm}>
    <h4 className={classes.title}>Create a Report</h4>
    <form className={classes.form} onSubmit={onFormSubmit}>
      <ValidateBackGround isValid={!formErrors?.title.length} className={formClasses.inputContainer}>
        <Label ariaLabel="Report Title" className={formClasses.label} htmlFor="title">
          Report Title
        </Label>
        <TextBox
          value={title}
          name="title"
          type="text"
          className={`mb-0 pb-0 ${formClasses.validateField} ${
            formErrors?.title.length ? formClasses.invalidField : formClasses.validField
          } ${formErrors?.title.length ? 'is-invalid' : ''}`}
          required
          placeholder="Report Name Here"
          ariaLabel="Please enter report title"
          onChange={onChangeTitle}
          autoComplete="off"
        />
        <div
          className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
            formErrors?.title.length ? 'd-block' : ''
          }`}
        >
          {formErrors?.title?.[0]}
        </div>
      </ValidateBackGround>
      <span className={`d-block mb-2 ${formClasses.label} mt-2`}>External Atmospheric Data</span>
      <div className="d-flex mb-4">
        <RadioButton
          onClick={onExternalClick}
          selected={showExternal === 'yes'}
          value="yes"
          className={classes.buttonSpace}
        >
          Yes
        </RadioButton>
        <RadioButton onClick={onExternalClick} selected={showExternal === 'no'} value="no">
          No
        </RadioButton>
      </div>
      <span className={`d-block mb-2 ${formClasses.label} mt-2`}>Internal Atmospheric Data</span>
      <div className="d-flex mb-4">
        <RadioButton
          onClick={onInternalClick}
          selected={showInternal === 'yes'}
          value="yes"
          className={classes.buttonSpace}
        >
          Yes
        </RadioButton>
        <RadioButton onClick={onInternalClick} selected={showInternal === 'no'} value="no">
          No
        </RadioButton>
      </div>
      <span className={`d-block mb-2 ${formClasses.label} mt-2`}>Moisture Logs</span>
      <div className="d-flex mb-4">
        <RadioButton
          onClick={onMaterialMoistureClick}
          selected={showMaterialMoisture === 'yes'}
          value="yes"
          className={classes.buttonSpace}
        >
          Yes
        </RadioButton>
        <RadioButton onClick={onMaterialMoistureClick} selected={showMaterialMoisture === 'no'} value="no">
          No
        </RadioButton>
      </div>
      <span className={`d-block mb-2 ${formClasses.label} mt-2`}>Equipment List</span>
      <div className="d-flex mb-4">
        <RadioButton
          onClick={onEquipmentClick}
          selected={showEquipment === 'yes'}
          value="yes"
          className={classes.buttonSpace}
        >
          Yes
        </RadioButton>
        <RadioButton onClick={onEquipmentClick} selected={showEquipment === 'no'} value="no">
          No
        </RadioButton>
      </div>
      <div className={classes.divider} />

      <span className={`d-block mb-2 ${formClasses.label} mt-2`}>Units</span>
      <div className="d-flex">
        <RadioButton
          onClick={onUnitTypeClick}
          selected={unitType === 'full_project'}
          value="full_project"
          className={classes.buttonSpace}
        >
          Full Project
        </RadioButton>
        <RadioButton onClick={onUnitTypeClick} selected={unitType === 'locations'} value="locations">
          Specific Locations
        </RadioButton>
      </div>
      <div className={classes.divider} />
      {unitType === 'locations' && (
        <div className="py-3">
          <ReportLocations />
        </div>
      )}

      <div className="w-100 d-flex justify-content-center">
        <PurpleButton type="submit" className={classes.submitButton} disabled={!title || fetching}>
          Generate Report
        </PurpleButton>
      </div>
    </form>
  </div>
);

const DryingReportFormMemo = memo(DryingReportForm, areEqual);

export { DryingReportFormMemo as DryingReportForm };
