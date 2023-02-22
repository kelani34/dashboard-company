import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { NoteCard } from 'Components/Notes';
import { NotesModel } from 'Containers/Notes';
import { convertWordsFirstLetterUppercase, formatDate } from 'Utils/helpers';
import { toggleNoteBookmark, toggleNoteFlag } from 'Containers/Notes/actions';
import { useDispatch } from 'react-redux';

interface Props {
  note: NotesModel;
  isReadOnly?: boolean;
  onClickDeleteIcon?: (e: any) => void;
}

const getNoteDate = (createdAt) => `${formatDate(createdAt, 'MMM d')} at ${formatDate(createdAt, 'h:mmaaa')}`;
const getPostedBy = (fullName) => convertWordsFirstLetterUppercase(fullName);

const NoteItemContainer = ({ note, isReadOnly, onClickDeleteIcon }: Props) => {
  const dispatch = useDispatch();

  const {
    id,
    body,
    is_flagged: isFlagged,
    is_bookmarked: isBookmarked,
    created_at: createdAt,
    edited_at: editedAt,
    author: { full_name: fullName, user_is_author: isAuthor },
  } = note;

  const [editable, setEditable] = useState(false);
  const [noteEdited, setNoteEdited] = useState(undefined);
  const [canModify] = useState(isReadOnly || isAuthor);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [flagged, seFlagged] = useState(isFlagged);
  const [noteContent, setNoteContent] = useState(body);
  const [postedByName] = useState(getPostedBy(fullName));
  const [datePosted, setDatePosted] = useState(getNoteDate(createdAt));
  const [dateEdited, setDateEdited] = useState(editedAt ? getNoteDate(editedAt) : '');

  const onClickFlagIcon = useCallback(() => {
    dispatch(toggleNoteFlag(id, setNoteEdited));
  }, []);

  const onClickBookmarkIcon = useCallback(() => {
    dispatch(toggleNoteBookmark(id, setNoteEdited));
  }, []);

  const onClickEditIcon = useCallback(() => {
    setEditable((prevState) => !prevState);
  }, []);

  // set note and id trigger the parent method to show the delete modal
  const onClickNoteDelete = useCallback((e: any) => {
    e.preventDefault();
    setEditable(false);
    onClickDeleteIcon(id);
  }, []);

  useEffect(() => {
    if (noteEdited?.id) {
      const {
        body,
        is_flagged: isFlagged,
        is_bookmarked: isBookmarked,
        created_at: createdAt,
        edited_at: editedAt,
      } = noteEdited;
      setNoteContent(body);
      setBookmarked(isBookmarked);
      seFlagged(isFlagged);
      setDatePosted(getNoteDate(createdAt));
      setEditable(false);
      if (editedAt) {
        setDateEdited(getNoteDate(editedAt));
      }
    }
  }, [noteEdited]);

  return (
    <NoteCard
      id={id}
      postedByName={postedByName}
      content={noteContent}
      bookmarked={bookmarked}
      flagged={flagged}
      datePosted={datePosted}
      dateEdited={dateEdited}
      setEditable={setEditable}
      setNoteEdited={setNoteEdited}
      editable={editable}
      canModify={canModify}
      onClickFlagIcon={onClickFlagIcon}
      onClickBookmarkIcon={onClickBookmarkIcon}
      onClickEditIcon={onClickEditIcon}
      onClickDeleteIcon={onClickNoteDelete}
    />
  );
};

NoteItemContainer.defaultProps = {
  isReadOnly: false,
  onClickDeleteIcon: undefined,
};

const NoteItemContainerMemo = memo(NoteItemContainer, areEqual);

export { NoteItemContainerMemo as NoteItemContainer };
