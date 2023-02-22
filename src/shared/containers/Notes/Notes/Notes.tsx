import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { LoadMoreNotesButton, NoteItems, NotesPlaceholder, NotesWrapper } from 'Components/Notes';
import { NotesHeader, NotesLocations, NotesFilter, NotesSearch } from 'Containers/Notes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingProjectSelector, projectSelector } from 'Containers/RocketScan/selectors';
import { Spinner } from 'Components/Spinner';
import {
  fetchingProjectNotesAllSelector,
  projectNotesCurrentPageSelector,
  projectNotesSelector,
  projectNotesTotalSelector,
} from 'Containers/Notes/selectors';
import { listProjectNotes } from 'Containers/Notes/actions';

import { useNotesFunctions } from 'Context/Notes';
import { getProject } from 'Containers/RocketScan/actions';
import classes from './notes.module.css';

const NotesContainer = () => {
  const dispatch = useDispatch();

  // get note delete and filter related functions
  const {
    noteDeleted,
    setNoteId,
    noteDeleteSection,
    setIsOpenDeleteNoteModal,
    setNoteDeleted,
    setNoteDeleteSection,
    filterBookmarked,
    filterFlagged,
    searchValue,
  }: any = useNotesFunctions();

  const projectNotes = useSelector(projectNotesSelector, areEqual);
  const projectNotesCurrentPage = useSelector(projectNotesCurrentPageSelector, areEqual);
  const projectNotesTotal = useSelector(projectNotesTotalSelector, areEqual);
  const fetchingProject = useSelector(fetchingProjectSelector, areEqual);
  const fetchingProjectNotes = useSelector(fetchingProjectNotesAllSelector, areEqual);
  const project = useSelector(projectSelector, areEqual);

  const [allNotesCount, setAllNotesCount] = useState(0);

  // api
  const getNotes = useCallback(
    (page = 1) => {
      dispatch(listProjectNotes(project?.id, page, filterBookmarked, filterFlagged, searchValue));
    },
    [project, filterBookmarked, filterFlagged, searchValue]
  );

  // fetch project to refresh total notes count
  useEffect(() => {
    if (project?.id) {
      dispatch(getProject(project.id));
    }
  }, [project]);

  // initial fetch
  // fetch on search
  // fetch on filter
  useEffect(() => {
    if (project?.id && (searchValue.length >= 2 || searchValue.length === 0)) {
      getNotes();
    }
  }, [project, filterBookmarked, filterFlagged, searchValue]);

  // fetch on delete
  useEffect(() => {
    if (noteDeleted && noteDeleteSection?.projectId === project?.id) {
      getNotes();
      setNoteDeleted(false);
    }
  }, [noteDeleted, filterBookmarked, filterFlagged]);

  // set initial all notes count
  useEffect(() => {
    if (project?.id) {
      const { allNotesCount } = project;
      setAllNotesCount(allNotesCount);
    }
  }, [project]);

  // load more notes button
  const onClickLoadMore = useCallback(() => {
    getNotes(projectNotesCurrentPage + 1);
  }, [project, projectNotesCurrentPage, filterBookmarked, filterFlagged]);

  /*
   * Note items methods
   * Note delete modal functions
   * */
  const onClickDeleteIcon = useCallback(
    (id: number) => {
      setNoteId(id);
      setIsOpenDeleteNoteModal(true);
      setNoteDeleteSection({ projectId: project.id });
    },
    [project]
  );

  return (
    <NotesWrapper>
      <Spinner loading={fetchingProject || fetchingProjectNotes} />
      {!fetchingProject && (
        <>
          <NotesHeader />
          <br />
          <div className={classes.notesFilterAndSearch}>
            <NotesFilter />
            <NotesSearch />
          </div>
          <NotesPlaceholder allNotes={allNotesCount}>
            <div className={classes.projectNotes}>
              <NoteItems notes={projectNotes} onClickDeleteIcon={onClickDeleteIcon} isReadOnly={false} />
              {projectNotesTotal > 2 && projectNotes.length >= 2 && projectNotesTotal - projectNotes.length > 0 && (
                <LoadMoreNotesButton
                  totalNotes={projectNotesTotal - projectNotes.length}
                  loadMoreNotesClick={onClickLoadMore}
                />
              )}
              <NotesLocations />
            </div>
          </NotesPlaceholder>
        </>
      )}
    </NotesWrapper>
  );
};

const NotesContainerMemo = memo(NotesContainer, areEqual);

export { NotesContainerMemo as NotesContainer };
