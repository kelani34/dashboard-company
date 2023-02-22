import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Button } from 'Components/Button';
import { TextArea } from 'Components/TextArea';

import formClasses from 'Themes/form/form.module.css';
import classes from './createNoteForm.module.css';

interface Props {
  errors?: any;
  noteText: string;
  placeholderText: string;
  pinkBackground?: boolean;
  disabled?: boolean;
  onNoteChange: (e: any) => void;
  onPostButtonClick: (e: any) => void;
}

const CreateNoteForm = ({
  errors,
  noteText,
  placeholderText,
  pinkBackground,
  disabled,
  onNoteChange,
  onPostButtonClick,
}: Props) => (
  <>
    <form className={`${classes.formContainer} ${pinkBackground ? classes.pinkBackground : ''}`}>
      <TextArea
        name="name"
        value={noteText}
        ariaLabel={placeholderText}
        placeholder={placeholderText}
        minRows={1}
        maxRows={6}
        maxLength={255}
        onChange={onNoteChange}
        className={classes.form}
        resizable={false}
      />
      <div className={classes.postButtonContainer}>
        <Button type="submit" className={classes.postButton} onClick={onPostButtonClick} disabled={disabled}>
          Post
        </Button>
      </div>
    </form>
    {noteText && (
      <div className={classes.charCount}>
        {noteText.length}
        /255
      </div>
    )}
    <div
      className={`${formClasses.invalidFieldFeedback} invalid-feedback ${errors.body.length ? 'd-block' : ''} ${
        classes.errorMessages
      }`}
    >
      {errors?.body?.[0]}
    </div>
  </>
);

CreateNoteForm.defaultProps = {
  errors: undefined,
  disabled: false,
  pinkBackground: false,
};

const CreateNoteFormMemo = memo(CreateNoteForm, areEqual);
export { CreateNoteFormMemo as CreateNoteForm };
