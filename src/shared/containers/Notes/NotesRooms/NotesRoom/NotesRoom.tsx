import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { listRoomNotes } from 'Containers/Notes/actions';
import { LoadMoreNotesButton, NoteItems, AllNotesAccordion } from 'Components/Notes';
import { SpinnerBlock } from 'Components/SpinnerBlock';
import { NotesPhotos } from 'Containers/Notes/NotesPhotos';
import { NotesDamagedMaterials } from 'Containers/Notes';
import { useNotesFunctions } from 'Context/Notes';
import { parseNumber } from 'Utils/numbers';
import { categoriesSelector } from 'Containers/RocketScan/selectors'; // temp

// import { listRoomNotes } from 'Containers/RocketScan/RoomsView/RoomNotes/actions';
interface Props {
  locationName: string;
  room: any;
}

const NotesRoomContainer = ({ locationName, room }: Props) => {
  const dispatch = useDispatch();

  const mounted = useRef(true);

  // room data
  const {
    id: roomId,
    room_type: { name: roomType },
    notes_count: notesCount,
    photo_notes_count: photoNotesCount = 0,
  } = room;

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
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [isRoomNotesOpen, setIsRoomNotesOpen] = useState(false);
  const totalNoteCount = parseNumber(notesCount + photoNotesCount);
  const notesCategories = useSelector(categoriesSelector, areEqual);
  // selectors
  const getNotes = useCallback(
    async (page = 1) => {
      setFetching(true);

      const response: any = await dispatch(
        listRoomNotes(roomId, page, filterBookmarked, filterFlagged, searchValue, notesCategories.photo)
      );

      if (mounted) {
        if (response?.data) {
          const { data, meta } = response;
          const { total, current_page: current } = meta;
          setTotal(total);
          setCurrentPage(current);

          if (page > 1) {
            setNotes((items) => [...items, ...data]);
          } else {
            setNotes(data);
          }
          setFetching(false);
        } else {
          setNotes([]);
          setFetching(false);
        }
      }
    },
    [roomId, mounted, filterBookmarked, filterFlagged, searchValue, notesCategories]
  );

  // initial fetch
  // fetch on search
  // fetch on filter
  useEffect(() => {
    if (isRoomNotesOpen && (searchValue.length >= 2 || searchValue.length === 0)) {
      mounted.current = true;
      (async function fetchData() {
        await getNotes();
      })();
    }

    return () => {
      if (mounted && isRoomNotesOpen) {
        mounted.current = false;
      }
    };
  }, [isRoomNotesOpen, filterBookmarked, filterFlagged, searchValue]);

  // fetch on delete
  useEffect(() => {
    if (noteDeleted && noteDeleteSection?.roomId === roomId) {
      (async function fetchData() {
        await getNotes();
      })();
      setNoteDeleted(false);
    }
  }, [noteDeleted]);

  // open and close room dropdown
  const onToggleDropdownState = () => {
    setIsRoomNotesOpen((prevState) => !prevState);
  };

  // load more room notes for location
  const onClickLoadMore = useCallback(async () => {
    await getNotes(currentPage + 1);
  }, [roomId, currentPage, filterBookmarked, filterFlagged]);

  /*
   * Note items methods
   * Note delete modal functions
   * */
  const onClickDeleteIcon = useCallback(
    (id: number) => {
      setNoteId(id);
      setIsOpenDeleteNoteModal(true);
      setNoteDeleteSection({ roomId });
    },
    [roomId]
  );

  return (
    <AllNotesAccordion
      title={`${locationName}, ${roomType}`}
      type="rooms"
      id={roomId}
      icon={roomType}
      isOpen={isRoomNotesOpen}
      totalNoteCount={totalNoteCount}
      onToggleClick={onToggleDropdownState}
    >
      <NoteItems notes={notes} isReadOnly={false} onClickDeleteIcon={onClickDeleteIcon} />

      <SpinnerBlock fetching={fetching} />

      {total > 10 && notes.length >= 10 && total - notes.length > 0 && (
        <LoadMoreNotesButton totalNotes={total - notes.length} loadMoreNotesClick={onClickLoadMore} />
      )}
      <NotesPhotos roomId={room.id} roomType={roomType} locationName={locationName} isRoomNotesOpen={isRoomNotesOpen} />

      <NotesDamagedMaterials room={room} locationName={locationName} category={notesCategories.damage} />
    </AllNotesAccordion>
  );
};

const NotesRoomContainerMemo = memo(NotesRoomContainer, areEqual);

export { NotesRoomContainerMemo as NotesRoomContainer };
