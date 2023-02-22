import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Button } from 'Components/Button';
import { TextBox } from 'Components/TextBox';

import classes from './createPhotoNote.module.css';

interface Props {
  noteText: string;
  placeholderText: string;
  onNoteChange: (e: any) => void;
  onPostButtonClick: (e: any) => void;
}

const CreatePhotoNote = ({ noteText, placeholderText, onNoteChange, onPostButtonClick }: Props) => (
  <form>
    <TextBox
      name="name"
      type="text"
      value={noteText}
      ariaLabel={placeholderText}
      placeholder={placeholderText}
      onChange={onNoteChange}
      className={`${classes.form}`}
    />
    <Button className="" onClick={onPostButtonClick}>
      Post
    </Button>
  </form>
);

const CreatePhotoNoteMemo = memo(CreatePhotoNote, areEqual);
export { CreatePhotoNoteMemo as CreatePhotoNote };
