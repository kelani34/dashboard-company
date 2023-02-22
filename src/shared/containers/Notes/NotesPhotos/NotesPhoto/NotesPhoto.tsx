import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { AllNotesAccordion, LoadMoreNotesButton, NoteItems } from 'Components/Notes';
import { Thumbnail } from 'Components/Thumbnail';

import { listPhotoNotes } from 'Containers/Notes/actions';
import { Spinner } from 'Components/Spinner';

import { useNotesFunctions } from 'Context/Notes';
import classes from './notesPhoto.module.css';

interface Props {
  photo: any;
  roomType: string;
  locationName: string;
  photoIndex: number;
  thumbnailSrcUrl: string;
  isRoomNotesOpen: boolean;
}

const NotesPhotoContainer = ({
  photo,
  roomType,
  locationName,
  photoIndex,
  thumbnailSrcUrl,
  isRoomNotesOpen,
}: Props) => {
  // get photo data
  const { id, notes_count: notesCount } = photo;

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
  const [photoNotes, setPhotoNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNotes, setTotalNotes] = useState(0);
  const [isOpen, setIsOpen] = useState(isRoomNotesOpen);
  const [fetching, setFetching] = useState(false);

  // API call
  const getNotes = useCallback(
    async (page = 1) => {
      setFetching(true);
      const response: any = await dispatch(listPhotoNotes(id, page, filterBookmarked, filterFlagged, searchValue));

      if (mounted) {
        if (response?.data) {
          const { data, meta } = response;
          const { current_page: current, total } = meta;

          if (page > 1) {
            setPhotoNotes((items) => [...items, ...data]);
          } else {
            setPhotoNotes(data);
          }
          setCurrentPage(current);
          setTotalNotes(total);
          setFetching(false);
        } else {
          setPhotoNotes([]);
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
    if (isOpen && (searchValue.length >= 2 || searchValue.length === 0)) {
      mounted.current = true;
      (async function fetchData() {
        await getNotes();
      })();
    }
  }, [isOpen, filterBookmarked, filterFlagged, searchValue]);

  // fetch more notes for photo
  const onClickLoadMore = useCallback(async () => {
    await getNotes(currentPage + 1);
  }, [currentPage, filterBookmarked, filterFlagged]);

  // fetch on delete
  useEffect(() => {
    if (noteDeleted && noteDeleteSection?.photoId === id) {
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
      setNoteDeleteSection({ photoId: id });
    },
    [id]
  );

  return (
    <AllNotesAccordion
      id={id}
      icon={roomType}
      title={`${locationName}, ${roomType} Photo ${photoIndex} `}
      totalNoteCount={notesCount}
      type="photo"
      isOpen={isOpen}
      onToggleClick={onToggleClick}
    >
      <Spinner loading={fetching} />
      <div className="d-flex justify-content-between align-items-start">
        <div className={classes.imageColumn}>
          <Thumbnail id={id} thumbnailSrcUrl={thumbnailSrcUrl} />
        </div>
        <div className={classes.notesColumn}>
          <NoteItems notes={photoNotes} onClickDeleteIcon={onClickDeleteIcon} isReadOnly={false} />
          {totalNotes > 10 && photoNotes.length >= 10 && totalNotes - photoNotes.length > 0 && (
            <LoadMoreNotesButton totalNotes={totalNotes - photoNotes.length} loadMoreNotesClick={onClickLoadMore} />
          )}
        </div>
      </div>
    </AllNotesAccordion>
  );
};

const NotesPhotoContainerMemo = memo(NotesPhotoContainer, areEqual);

export { NotesPhotoContainerMemo as NotesPhoto };
