import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { listRoomNotes } from 'Containers/Notes/actions';
import { LoadMoreNotesButton, NoteItems, AllNotesAccordion } from 'Components/Notes';
import { Spinner } from 'Components/Spinner';

import { useNotesFunctions } from 'Context/Notes';
import { parseNumber } from 'Utils/numbers';

interface Props {
  locationName: string;
  room: any;
  category?: any;
}

const NotesDamagedMaterialsContainer = ({ locationName, room, category }: Props) => {
  const dispatch = useDispatch();

  const mounted = useRef(true);

  // room data
  const {
    id: roomId,
    room_type: { name: roomType },
    notes_count: notesCount,
    photo_notes_count: photoNotesCount,
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
  const [isOpen, setIsOpen] = useState(true);
  const totalNoteCount = parseNumber(notesCount - photoNotesCount);

  const getNotes = useCallback(
    async (page = 1) => {
      setFetching(true);

      const response: any = await dispatch(
        listRoomNotes(roomId, page, filterBookmarked, filterFlagged, searchValue, category)
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
    [roomId, mounted, filterBookmarked, filterFlagged, searchValue, category]
  );

  // initial fetch
  // fetch on search
  // fetch on filter
  useEffect(() => {
    if (isOpen && (searchValue.length >= 2 || searchValue.length === 0)) {
      mounted.current = true;
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
    setIsOpen((prevState) => !prevState);
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
    <>
      {notes?.length > 0 && (
        <AllNotesAccordion
          title={`${locationName}, Damaged Materials`}
          type="rooms"
          id={roomId}
          icon={roomType}
          isOpen={isOpen}
          totalNoteCount={totalNoteCount}
          onToggleClick={onToggleDropdownState}
        >
          <NoteItems notes={notes} isReadOnly={false} onClickDeleteIcon={onClickDeleteIcon} />

          <Spinner loading={fetching} />

          {total > 10 && notes.length >= 10 && total - notes.length > 0 && (
            <LoadMoreNotesButton totalNotes={total - notes.length} loadMoreNotesClick={onClickLoadMore} />
          )}
        </AllNotesAccordion>
      )}
    </>
  );
};

NotesDamagedMaterialsContainer.defaultProps = {
  category: undefined,
};

const NotesDamagedMaterialsContainerMemo = memo(NotesDamagedMaterialsContainer, areEqual);

export { NotesDamagedMaterialsContainerMemo as NotesDamagedMaterials };
