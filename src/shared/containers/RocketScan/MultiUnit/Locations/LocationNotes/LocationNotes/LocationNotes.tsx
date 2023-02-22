import React, { memo, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { NotesDropdown, CreateNoteForm, NoteItems, LoadMoreNotesButton } from 'Components/Notes';
import { Spinner } from 'Components/Spinner';

import { limitText } from 'Utils/helpers';
import { useNotesFunctions } from 'Context/Notes';
import { createLocationNote, listLocationNotes, setLocationNoteCreated } from '../actions';
import {
  locationNotesSelector,
  bodyErrorSelector,
  fetchingLocationNotesSelector,
  locationNoteCreatedSelector,
  currentPageSelector,
  totalNotesCountSelector,
} from '../selectors';

import classes from './locationNotes.module.css';

interface Props {
  locationId: number;
  hasBookmarked?: boolean;
  hasFlagged?: boolean;
}

const LocationNotes = ({ locationId, hasBookmarked, hasFlagged }: Props) => {
  const dispatch = useDispatch();

  // get note delete related functions
  const {
    noteDeleted,
    setNoteId,
    noteDeleteSection,
    setIsOpenDeleteNoteModal,
    setNoteDeleted,
    setNoteDeleteSection,
  }: any = useNotesFunctions();

  // selectors
  const locationNotes = useSelector(locationNotesSelector, areEqual);
  const fetching = useSelector(fetchingLocationNotesSelector, areEqual);
  const locationNoteCreated = useSelector(locationNoteCreatedSelector, areEqual);
  const totalNotesCount = useSelector(totalNotesCountSelector, areEqual);
  const currentPage = useSelector(currentPageSelector, areEqual);

  // local state
  const [newNoteText, setNewNoteText] = useState('');
  const [isOpenNotes, setIsOpenNotes] = useState(false);
  const [notePlaceholder, setNotePlaceholder] = useState('Add your location notes here');
  const [disablePostButton, setDisablePostButton] = useState(false);

  // form errors
  const errors = {
    body: useSelector(bodyErrorSelector, areEqual),
  };

  // open and close the notes dropdown
  const onToggleAccordion = useCallback(() => setIsOpenNotes((prevState) => !prevState), []);

  // get notes
  const getNotes = useCallback(
    (page = 1) => {
      dispatch(listLocationNotes(locationId, page));
    },
    [locationId]
  );

  // fetch notes only when changing location
  useEffect(() => {
    if (locationId) {
      dispatch(setLocationNoteCreated(false));
      getNotes();
    }
  }, [locationId]);

  // refresh notes after creating a new note
  useEffect(() => {
    if (locationNoteCreated) {
      dispatch(setLocationNoteCreated(false));
      setNewNoteText('');
      getNotes();
    }
  }, [locationNoteCreated]);

  // fetch on delete
  useEffect(() => {
    if (noteDeleted && noteDeleteSection?.locationId === locationId) {
      getNotes();
      setNoteDeleted(false);
    }
  }, [noteDeleted]);

  // update the recent note placeholder
  useEffect(() => {
    if (locationNotes?.length > 0) {
      const [note] = locationNotes;
      const { body } = note;

      setNotePlaceholder(limitText(body, 100));
    }
  }, [locationNotes]);

  // load more notes
  const onClickLoadMore = useCallback(
    (e: any) => {
      e.preventDefault();
      if (locationId) {
        getNotes(currentPage + 1);
      }
    },
    [currentPage, locationId]
  );

  // Note form functions
  const onChangeNoteText = useCallback(({ target: { value } }: any) => {
    if (value.length <= 255) {
      setNewNoteText(value);
    }
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      setDisablePostButton(true);
      setTimeout(() => {
        setDisablePostButton(false);
      }, 1000);
      dispatch(createLocationNote(locationId, { body: newNoteText }));
    },
    [newNoteText]
  );

  const onClickDeleteIcon = useCallback((id: number) => {
    setNoteId(id);
    setIsOpenDeleteNoteModal(true);
    setNoteDeleteSection({ locationId });
  }, []);

  return (
    <div className={classes.notesBase}>
      <NotesDropdown
        type="location"
        isOpen={isOpenNotes}
        onToggleClick={onToggleAccordion}
        totalNoteCount={totalNotesCount}
        hasBookmarked={hasBookmarked}
        hasFlagged={hasFlagged}
        placeholder={notePlaceholder}
      >
        {fetching && <Spinner loading={fetching} />}
        <NoteItems notes={locationNotes} isReadOnly={false} onClickDeleteIcon={onClickDeleteIcon} />
        {totalNotesCount > 2 && locationNotes.length >= 2 && totalNotesCount - locationNotes.length > 0 && (
          <LoadMoreNotesButton
            totalNotes={totalNotesCount - locationNotes.length}
            loadMoreNotesClick={onClickLoadMore}
          />
        )}
        <div className={classes.createNoteFormBackground}>
          <CreateNoteForm
            errors={errors}
            noteText={newNoteText}
            disabled={disablePostButton}
            placeholderText="Add your note here..."
            onNoteChange={onChangeNoteText}
            onPostButtonClick={onFormSubmit}
          />
        </div>
      </NotesDropdown>
    </div>
  );
};

LocationNotes.defaultProps = {
  hasBookmarked: undefined,
  hasFlagged: undefined,
};

const LocationNotesMemo = memo(LocationNotes, areEqual);
export { LocationNotesMemo as LocationNotes };
