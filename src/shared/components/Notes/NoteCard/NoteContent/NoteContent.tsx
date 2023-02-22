import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Anchorme } from 'react-anchorme';

import { EditNote } from 'Containers/Notes';
import classes from './noteContent.module.css';

interface Props {
  id: number;
  content: string;
  dateEdited: string;
  editable: boolean;
  setEditable: (e: any) => void;
  setNoteEdited: (e: any) => void;
}

const NoteContent = ({ id, content, dateEdited, editable, setEditable, setNoteEdited }: Props) =>
  editable ? (
    <EditNote id={id} content={content} editable={editable} setNoteEdited={setNoteEdited} setEditable={setEditable} />
  ) : (
    <div className={`${classes.noteContent}`}>
      <Anchorme target="_blank">{content}</Anchorme>
      {dateEdited && <span className={classes.noteEdited}>{` (Edited on ${dateEdited})`}</span>}
    </div>
  );

const NoteContentMemo = memo(NoteContent, areEqual);

export { NoteContentMemo as NoteContent };
