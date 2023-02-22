import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { NoteCard } from 'Components/Notes';
import { compareTwoDates, convertWordsFirstLetterUppercase, formatDate } from 'Utils/helpers';

interface Props {
  id: number;
  note: any;
  isReadOnly: boolean;
}

const getNoteDate = (createdAt) => `${formatDate(createdAt, 'MMM d')} at ${formatDate(createdAt, 'h:mmaaa')}`;
const getPostedBy = (fullName) => convertWordsFirstLetterUppercase(fullName);

const PhotoShareNoteCardContainer = ({ id, note, isReadOnly }: Props) => {
  const {
    author: { full_name: fullName },
    created_at: createdAt,
    body: noteContent,
    is_flagged: isFlagged,
    is_bookmarked: isBookmarked,
    updated_at: updatedAt,
  } = note;

  const postedByName = getPostedBy(fullName);
  const datePosted = getNoteDate(createdAt);
  const dateEdited = compareTwoDates(createdAt, updatedAt) ? '' : getNoteDate(updatedAt);

  return (
    <NoteCard
      id={id}
      canModify={isReadOnly}
      postedByName={postedByName}
      datePosted={datePosted}
      dateEdited={dateEdited}
      content={noteContent}
      bookmarked={isBookmarked}
      flagged={isFlagged}
    />
  );
};

const PhotoShareNoteCardContainerMemo = memo(PhotoShareNoteCardContainer, areEqual);

export { PhotoShareNoteCardContainerMemo as PhotoShareNoteCard };
