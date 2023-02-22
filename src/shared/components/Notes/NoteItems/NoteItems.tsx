import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { NoteItem } from 'Containers/Notes';

interface Props {
  notes: any[];
  isReadOnly: boolean;
  onClickDeleteIcon: (e: any) => void;
}

const NoteItems = ({ notes, isReadOnly, onClickDeleteIcon }: Props) =>
  notes.length > 0 &&
  notes.map((note: any) => (
    <NoteItem key={note.id} note={note} isReadOnly={isReadOnly} onClickDeleteIcon={onClickDeleteIcon} />
  ));

// @ts-ignore
const NoteItemsMemo = memo(NoteItems, areEqual);

export { NoteItemsMemo as NoteItems };
