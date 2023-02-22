import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { PhotoShareNoteCard } from 'Containers/Public/PhotoShare';

import classes from './photoShareNotes.module.css';

interface Props {
  notes: any[];
}

const PhotoShareNotes = ({ notes }: Props) => (
  <div className={`${classes.notesWrapper}`}>
    <div className={`w-100 d-block ${classes.title}`}>Notes</div>
    {notes?.length > 0 && (
      <ul className={`nav flex-column mb-auto ${classes.notesList}`}>
        {notes.map((note: any) => (
          <PhotoShareNoteCard key={note.id} id={note.id} note={note} isReadOnly={false} />
        ))}
      </ul>
    )}
  </div>
);

const PhotoShareNotesMemo = memo(PhotoShareNotes, areEqual);

export { PhotoShareNotesMemo as PhotoShareNotes };
