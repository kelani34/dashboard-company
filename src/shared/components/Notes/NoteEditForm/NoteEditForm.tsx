import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { ValidateBackGround } from 'Components/Validation';

import formClasses from 'Themes/form/form.module.css';
import { AutoFocusTextArea } from 'Containers/AutoFocusTextArea';
import { DarkPurpleButton, PurpleButton } from 'Components/Button';
import classes from './noteEditForm.module.css';

interface Props {
  note: string;
  editable: boolean;
  formErrors: any;
  fetching: boolean;
  onNoteChange: (e: any) => void;
  onClickCancel: (e: any) => void;
  onFormSubmit: (e: any) => void;
}

const NoteEditForm = ({ note, editable, formErrors, fetching, onNoteChange, onClickCancel, onFormSubmit }: Props) => (
  <form className={`requires-validation g-3 ${classes.noteEditFormBase}`} noValidate action="#">
    <ValidateBackGround
      isValid={!formErrors?.body.length}
      className={`${formClasses.inputContainer} ${classes.validationBackground}`}
    >
      <AutoFocusTextArea
        name="note"
        value={note}
        autoFocus={editable}
        placeholder="Edit note"
        ariaLabel="Edit note"
        className={classes.textBox}
        onValueChange={onNoteChange}
        isValid={formErrors.body.length > 0}
      />
      <div
        className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
          formErrors?.body.length > 0 ? 'd-block' : ''
        }`}
      >
        {formErrors.body?.[0]}
      </div>
    </ValidateBackGround>
    {note && (
      <div className={classes.charCount}>
        {note.length}
        /255
      </div>
    )}
    <div className="d-flex mt-2 flex-row justify-content-end">
      <DarkPurpleButton
        className={`${classes.buttons} ${classes.cancelButton}`}
        type="submit"
        onClick={onClickCancel}
        disabled={fetching}
      >
        Cancel
      </DarkPurpleButton>
      <PurpleButton className={classes.buttons} type="submit" onClick={onFormSubmit} disabled={fetching} outlined>
        Save
      </PurpleButton>
    </div>
  </form>
);

const NoteEditFormMemo = memo(NoteEditForm, areEqual);

export { NoteEditFormMemo as NoteEditForm };
