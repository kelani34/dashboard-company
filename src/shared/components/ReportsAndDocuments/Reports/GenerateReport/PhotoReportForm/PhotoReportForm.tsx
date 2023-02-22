import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import formClasses from 'Themes/form/form.module.css';
import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';
import { ValidateBackGround } from 'Components/Validation';

import { Icon } from 'Components/Icons';
import { ReportLocations } from 'Containers/ReportsAndDocuments';
import { PurpleButton, RadioButton } from 'Components/Button';
import classes from './photoReportForm.module.css';

interface Props {
  title: string;
  format: string;
  unitType: string;
  photosType: string;
  notesType: string;
  photoNotesType: string;
  damagedMaterials: string;
  formErrors: any;
  fetching: boolean;
  onChangeTitle: (e: any) => void;
  onUnitTypeClick: (e: any) => void;
  onSelectFormat: (e: any) => void;
  onPhotosTypeClick: (e: any) => void;
  onNotesTypeClick: (e: any) => void;
  onPhotoNotesTypeClick: (e: any) => void;
  onDamagedMaterialsClick: (e: any) => void;
  onFormSubmit: (e: any) => void;
}

const PhotoReportForm = ({
  title,
  format,
  unitType,
  photosType,
  notesType,
  photoNotesType,
  damagedMaterials,
  formErrors,
  fetching,
  onChangeTitle,
  onUnitTypeClick,
  onSelectFormat,
  onPhotosTypeClick,
  onNotesTypeClick,
  onPhotoNotesTypeClick,
  onDamagedMaterialsClick,
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
      <div className="d-flex">
        <div className={classes.reportsFormat}>
          <span className={formClasses.label}>Report Format</span>
          <div className="d-flex mt-3 justify-content-between">
            <div>
              <p className={classes.reportsFormatTitle}>Compact</p>
              <span id="compact" role="button" onClick={onSelectFormat} onKeyUp={onSelectFormat} tabIndex={0}>
                <Icon type="reportscompact" className={format === 'compact' ? classes.formatSelected : ''} />
              </span>
            </div>
            {/* <div>
              <p className={classes.reportsFormatTitle}>Expanded</p>
              <span id="expanded" role="button" onClick={onSelectFormat} onKeyUp={onSelectFormat} tabIndex={0}>
                <Icon type="reportsexpanded" className={format === 'expanded' ? classes.formatSelected : ''} />
              </span>
            </div> */}
            <div>
              <p className={classes.reportsFormatTitle}>Large</p>
              <span id="large" role="button" onClick={onSelectFormat} onKeyUp={onSelectFormat} tabIndex={0}>
                <Icon type="reportslarge" className={format === 'large' ? classes.formatSelected : ''} />
              </span>
            </div>
          </div>
        </div>
        <div className={classes.divider} />
      </div>
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

      <span className={`d-block mb-2 ${formClasses.label}`}>Photos</span>
      <div className="d-flex mb-4">
        <RadioButton
          onClick={onPhotosTypeClick}
          selected={photosType === 'all'}
          value="all"
          className={classes.buttonSpace}
        >
          All Photos
        </RadioButton>
        <RadioButton onClick={onPhotosTypeClick} selected={photosType === 'bookmark'} value="bookmark">
          Bookmark Only
        </RadioButton>
      </div>
      <div className={classes.divider} />
      <span className={`d-block mb-2 ${formClasses.label}`}>Project, Unit and Room Notes</span>
      <div className="d-flex mb-4">
        <RadioButton
          onClick={onNotesTypeClick}
          selected={notesType === 'all'}
          value="all"
          className={classes.buttonSpace}
        >
          All
        </RadioButton>
        <RadioButton
          onClick={onNotesTypeClick}
          selected={notesType === 'bookmark'}
          value="bookmark"
          className={classes.buttonSpace}
        >
          Bookmark Only
        </RadioButton>
        <RadioButton onClick={onNotesTypeClick} selected={notesType === 'none'} value="none">
          None
        </RadioButton>
      </div>

      <span className={`d-block mb-2 ${formClasses.label}`}>Photo Notes</span>
      <div className="d-flex mb-4">
        <RadioButton
          onClick={onPhotoNotesTypeClick}
          selected={photoNotesType === 'all'}
          value="all"
          className={classes.buttonSpace}
        >
          All Photos
        </RadioButton>
        <RadioButton
          onClick={onPhotoNotesTypeClick}
          selected={photoNotesType === 'bookmark'}
          value="bookmark"
          className={classes.buttonSpace}
        >
          Bookmark Only
        </RadioButton>
        <RadioButton onClick={onPhotoNotesTypeClick} selected={photoNotesType === 'none'} value="none">
          None
        </RadioButton>
      </div>
      <div className={classes.divider} />
      <span className={`d-block mb-2 ${formClasses.label}`}>Damaged Materials</span>
      <div className="d-flex mb-4">
        <RadioButton
          onClick={onDamagedMaterialsClick}
          selected={damagedMaterials === 'yes'}
          value="yes"
          className={classes.buttonSpace}
        >
          Yes
        </RadioButton>
        <RadioButton onClick={onDamagedMaterialsClick} selected={damagedMaterials === 'no'} value="no">
          No
        </RadioButton>
      </div>
      <div className={classes.divider} />

      <div className="w-100 d-flex justify-content-center">
        <PurpleButton type="submit" className={classes.submitButton} disabled={!title || fetching}>
          Generate Report
        </PurpleButton>
      </div>
    </form>
  </div>
);

const PhotoReportFormMemo = memo(PhotoReportForm, areEqual);

export { PhotoReportFormMemo as PhotoReportForm };
