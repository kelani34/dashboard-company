import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { AllNotesAccordion, LoadMoreNotesButton, NoteItems } from 'Components/Notes';
import { NotesRooms } from 'Containers/Notes';
import { listLocationNotes } from 'Containers/Notes/actions';
import { SpinnerBlock } from 'Components/SpinnerBlock';
import { useNotesFunctions } from 'Context/Notes';
import { parseNumber } from 'Utils/numbers';

interface Props {
  location: any;
}

const NotesLocationContainer = ({ location }: Props) => {
  // get location data
  const {
    id,
    name,
    notes_count: notesCount,
    room_notes_count: roomNotesCount = 0,
    photo_notes_count: photoNotesCount = 0,
    location_type: { name: locationType },
  } = location;

  const dispatch = useDispatch();

  const mounted = useRef(false);

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

  // local variables
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNotes, setTotalNotes] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [fetching, setFetching] = useState(false);
  const totalNoteCount = parseNumber(notesCount + roomNotesCount + photoNotesCount);

  // API call
  const getNotes = useCallback(
    async (page = 1) => {
      setFetching(true);
      const response: any = await dispatch(listLocationNotes(id, page, filterBookmarked, filterFlagged, searchValue));

      if (mounted) {
        if (response?.data) {
          const { data, meta } = response;
          const { current_page: current, total } = meta;

          if (page > 1) {
            setNotes((items) => [...items, ...data]);
          } else {
            setNotes(data);
          }
          setCurrentPage(current);
          setTotalNotes(total);
          setFetching(false);
        } else {
          setNotes([]);
          setFetching(false);
        }
      }
    },
    [mounted, id, filterBookmarked, filterFlagged, searchValue]
  );

  // initial fetch
  // fetch on search
  // fetch on filter
  useEffect(() => {
    mounted.current = true;

    if (isOpen && (searchValue.length >= 2 || searchValue.length === 0) && mounted) {
      (async function fetchData() {
        await getNotes();
      })();
    }

    return () => {
      if (mounted && isOpen) {
        mounted.current = false;
      }
    };
  }, [isOpen, filterBookmarked, filterFlagged, searchValue]);

  // load more notes button
  const onClickLoadMore = useCallback(async () => {
    await getNotes(currentPage + 1);
  }, [currentPage, filterBookmarked, filterFlagged]);

  // fetch on delete
  useEffect(() => {
    if (noteDeleted && noteDeleteSection?.locationId === id) {
      (async function fetchData() {
        await getNotes();
      })();
      setNoteDeleted(false);
    }
  }, [noteDeleted]);

  // accordion methods
  const onToggleClick = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  /*
   * Note items methods
   * Note delete modal functions
   * */

  const onClickDeleteIcon = useCallback(
    (noteId: number) => {
      setNoteId(noteId);
      setIsOpenDeleteNoteModal(true);
      setNoteDeleteSection({ locationId: id });
    },
    [id]
  );

  return (
    <AllNotesAccordion
      id={id}
      icon={`${locationType}sm`}
      title={name}
      totalNoteCount={totalNoteCount}
      type="location"
      isOpen={isOpen}
      onToggleClick={onToggleClick}
    >
      <SpinnerBlock fetching={fetching} />
      <NoteItems notes={notes} onClickDeleteIcon={onClickDeleteIcon} isReadOnly={false} />
      {totalNotes > 10 && notes.length >= 10 && totalNotes - notes.length > 0 && (
        <LoadMoreNotesButton totalNotes={totalNotes - notes.length} loadMoreNotesClick={onClickLoadMore} />
      )}
      <NotesRooms locationName={name} locationId={id} isLocationOpen={isOpen} />
    </AllNotesAccordion>
  );
};

const NotesLocationContainerMemo = memo(NotesLocationContainer, areEqual);

export { NotesLocationContainerMemo as NotesLocationContainer };
