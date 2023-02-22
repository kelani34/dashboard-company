import React, { memo, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spinner } from 'Components/Spinner';
import { NotesDropdown, CreateNoteForm, NoteItems, LoadMoreNotesButton } from 'Components/Notes';
import { UserModel } from 'Containers/User/Models/UserModel';
import { useUser } from 'Context/User';
import { isCompanyAdmin } from 'Utils/roles';
import { areEqual } from 'Utils/equalityChecks';

import { projectSelector } from 'Containers/RocketScan/selectors';
import { limitText } from 'Utils/helpers';

import { useNotesFunctions } from 'Context/Notes';
import { pusherSelector } from 'Containers/Core/selectors';
import { createProjectNote, listProjectNotes, setProjectNoteCreated } from '../actions';
import {
  projectNotesSelector,
  fetchingProjectNotesSelector,
  projectNoteCreatedSelector,
  bodyErrorSelector,
  projectTotalAllNotesSelector,
  projectCurrentPageNotesSelector,
} from '../selectors';

import classes from './projectNotes.module.css';

const ProjectNotesContainer = () => {
  const dispatch = useDispatch();

  const user: UserModel = useUser();

  // get note delete related functions
  const {
    noteDeleted,
    setNoteId,
    noteDeleteSection,
    setIsOpenDeleteNoteModal,
    setNoteDeleted,
    setNoteDeleteSection,
  }: any = useNotesFunctions();

  // local state variables
  const [isOpen, setIsOpen] = useState(false);
  const [projectId, setProjectId] = useState();
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [hasFlagged, setHasFlagged] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [latestNote, setLatestNote] = useState('Add your project notes here');
  const [isReadOnly] = useState(isCompanyAdmin(user?.roles));
  const [disablePostButton, setDisablePostButton] = useState(false);

  // errors
  const errors = {
    body: useSelector(bodyErrorSelector, areEqual),
  };

  // selectors
  const project = useSelector(projectSelector, areEqual);
  const notes = useSelector(projectNotesSelector, areEqual);
  const projectNoteCreated = useSelector(projectNoteCreatedSelector, areEqual);
  const totalNotesCount = useSelector(projectTotalAllNotesSelector, areEqual);
  const currentPage = useSelector(projectCurrentPageNotesSelector, areEqual);
  const fetchingNotes = useSelector(fetchingProjectNotesSelector, areEqual);
  const pusher = useSelector(pusherSelector, areEqual);

  // verify project object has values
  useEffect(() => {
    if (project?.id) {
      const { id: projectId, bookmarkedNotesCount, flaggedNotesCount } = project;
      setProjectId(projectId);
      setHasBookmarked(bookmarkedNotesCount > 0);
      setHasFlagged(flaggedNotesCount > 0);
    }
  }, [project]);

  // get project notes
  const getNotes = useCallback(
    (page = 1) => {
      dispatch(listProjectNotes(projectId, page));
    },
    [projectId]
  );

  useEffect(() => {
    if (projectId && pusher) {
      pusher
        .subscribe(`BroadcastNoteCreatedEvent.Project.${projectId}`)
        .bind('App\\Events\\BroadcastNoteCreatedEvent', getNotes);
      pusher
        .subscribe(`BroadcastNoteDeletedEvent.Project.${projectId}`)
        .bind('App\\Events\\BroadcastNoteDeletedEvent', getNotes);
      pusher
        .subscribe(`BroadcastNoteUpdatedEvent.Project.${projectId}`)
        .bind('App\\Events\\BroadcastNoteUpdatedEvent', getNotes);
    }
    return () => {
      if (pusher) {
        pusher.unsubscribe(`BroadcastNoteCreatedEvent.Project.${projectId}`);
        pusher.unsubscribe(`BroadcastNoteDeletedEvent.Project.${projectId}`);
        pusher.unsubscribe(`BroadcastNoteUpdatedEvent.Project.${projectId}`);
      }
    };
  }, [projectId]);

  // fetch notes only when changing project
  useEffect(() => {
    if (projectId) {
      dispatch(setProjectNoteCreated(false));
      getNotes();
    }
  }, [projectId]);

  // refresh notes after creating a new note
  useEffect(() => {
    if (projectNoteCreated) {
      dispatch(setProjectNoteCreated(false));
      setNewNoteText('');
      getNotes();
    }
  }, [projectNoteCreated]);

  // fetch on delete
  useEffect(() => {
    if (noteDeleted && noteDeleteSection?.projectId === projectId) {
      getNotes();
      setNoteDeleted(false);
    }
  }, [noteDeleted]);

  // set most recent note text as a placeholder
  useEffect(() => {
    if (notes?.length > 0) {
      const [note] = notes;
      const { body } = note;

      setLatestNote(limitText(body, 100));
    }
  }, [notes]);

  // toggle the list open and close
  const onToggleDropdownState = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  // increase page number by 1 to load next 2 notes
  const onClickLoadMore = useCallback(
    (e: any) => {
      e.preventDefault();
      getNotes(currentPage + 1);
    },
    [currentPage, projectId]
  );

  const onChange = useCallback(({ target: { value } }: any) => {
    setNewNoteText(value);
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      setDisablePostButton(true);
      setTimeout(() => {
        setDisablePostButton(false);
      }, 1000);
      dispatch(createProjectNote(projectId, { body: newNoteText }));
    },
    [projectId, newNoteText]
  );

  const onClickDeleteIcon = useCallback(
    (id: number) => {
      setNoteId(id);
      setIsOpenDeleteNoteModal(true);
      setNoteDeleteSection({ projectId });
    },
    [projectId]
  );

  return (
    <div className={classes.projectNotesWrapper}>
      <NotesDropdown
        placeholder={latestNote}
        type="project"
        totalNoteCount={totalNotesCount}
        hasBookmarked={hasBookmarked}
        hasFlagged={hasFlagged}
        isOpen={isOpen}
        onToggleClick={onToggleDropdownState}
      >
        <div className={classes.notesSpinnerWrapper}>
          <Spinner loading={fetchingNotes} />
        </div>
        <NoteItems notes={notes} isReadOnly={isReadOnly} onClickDeleteIcon={onClickDeleteIcon} />
        {totalNotesCount > 2 && notes.length >= 2 && totalNotesCount - notes.length > 0 && (
          <LoadMoreNotesButton totalNotes={totalNotesCount - notes.length} loadMoreNotesClick={onClickLoadMore} />
        )}

        <div className={classes.createNoteFormWrapper}>
          <CreateNoteForm
            errors={errors}
            noteText={newNoteText}
            disabled={disablePostButton}
            placeholderText="Add your note here..."
            onNoteChange={onChange}
            onPostButtonClick={onFormSubmit}
          />
        </div>
      </NotesDropdown>
    </div>
  );
};
const ProjectNotesContainerMemo = memo(ProjectNotesContainer, areEqual);

export { ProjectNotesContainerMemo as ProjectNotes };
