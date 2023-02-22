import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { NoteHeader } from './NoteHeader';
import { NoteContent } from './NoteContent';

import classes from './noteCard.module.css';

interface Props {
  id: number;
  postedByName: string;
  datePosted: string;
  dateEdited: string;
  canModify: boolean;
  content: string;
  bookmarked: boolean;
  flagged: boolean;
  editable?: boolean;
  setEditable?: (e: any) => void;
  setNoteEdited?: (e: any) => void;
  onClickFlagIcon?: (e: any) => void;
  onClickBookmarkIcon?: (e: any) => void;
  onClickEditIcon?: (e: any) => void;
  onClickDeleteIcon?: (e: any) => void;
}

const NoteCard = ({
  id,
  postedByName,
  datePosted,
  dateEdited,
  canModify,
  content,
  bookmarked,
  flagged,
  editable,
  setEditable,
  setNoteEdited,
  onClickFlagIcon,
  onClickBookmarkIcon,
  onClickEditIcon,
  onClickDeleteIcon,
}: Props) => (
  <>
    <div className={`${classes.noteCard} ${editable ? classes.isEditable : ''}`} id={`${id.toString()}`}>
      <NoteHeader
        postedByName={postedByName}
        datePosted={datePosted}
        canModify={canModify}
        bookmarked={bookmarked}
        flagged={flagged}
        onClickFlagIcon={onClickFlagIcon}
        onClickBookmarkIcon={onClickBookmarkIcon}
        onClickEditIcon={onClickEditIcon}
        onClickDeleteIcon={onClickDeleteIcon}
      />
      <NoteContent
        id={id}
        content={content}
        dateEdited={dateEdited}
        editable={editable}
        setEditable={setEditable}
        setNoteEdited={setNoteEdited}
      />
    </div>
  </>
);

NoteCard.defaultProps = {
  editable: false,
  setEditable: undefined,
  setNoteEdited: undefined,
  onClickFlagIcon: undefined,
  onClickBookmarkIcon: undefined,
  onClickEditIcon: undefined,
  onClickDeleteIcon: undefined,
};
const NoteCardMemo = memo(NoteCard, areEqual);

export { NoteCardMemo as NoteCard };
