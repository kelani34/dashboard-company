import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { CreateNoteForm, LoadMoreNotesButton, NoteItems, NotesDropdown } from 'Components/Notes';

import { useDispatch, useSelector } from 'react-redux';
import { bodyErrorSelector } from 'Containers/RocketScan/RoomsView/RoomNotes/selectors';

import { createRoomNote, listRoomNotes } from 'Containers/RocketScan/RoomsView/RoomNotes/actions';
import { UserModel } from 'Containers/User/Models/UserModel';
import { useUser } from 'Context/User';
import { isCompanyAdmin } from 'Utils/roles';
import { Spinner } from 'Components/Spinner';
import { useNotesFunctions } from 'Context/Notes';
import classes from './roomNotes.module.css';

interface Props {
  roomId: number;
  notesCount?: number;
  hasBookmarked?: boolean;
  hasFlagged?: boolean;
  category?: any;
  title: string;
  placeholder: string;
}

const RoomNotesContainer = ({ roomId, notesCount, hasBookmarked, hasFlagged, category, title, placeholder }: Props) => {
  const dispatch = useDispatch();

  const mounted = useRef(true);

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

  // local state
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNotes, setTotalNotes] = useState(notesCount);
  const [isOpenNotes, setIsOpenNotes] = useState(false);
  const [isReadOnly] = useState(isCompanyAdmin(user?.roles));
  const [latestNote, setLatestNote] = useState(placeholder);
  const [initialFetch, setInitialFetch] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [disablePostButton, setDisablePostButton] = useState(false);

  // errors
  const errors = {
    body: useSelector(bodyErrorSelector, areEqual),
  };

  // API call
  const getNotes = useCallback(
    async (page = 1) => {
      setFetching(true);
      const response: any = await dispatch(listRoomNotes(roomId, page, category));

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
    [mounted, category]
  );

  const onClickLoadMore = useCallback(async () => {
    await getNotes(currentPage + 1);
  }, [currentPage]);

  // fetch notes only when the section is opened
  // useEffect(() => {
  //   if (isOpenNotes && notes.length === 0) {
  //     mounted.current = true;
  //     (async function fetchData() {
  //       await getNotes();
  //     })();
  //   }

  //   return () => {
  //     if (mounted && isOpenNotes) {
  //       mounted.current = false;
  //     }
  //   };
  // }, [isOpenNotes, category]);

  // fetch notes on load
  useEffect(() => {
    if (initialFetch && notes.length === 0) {
      mounted.current = true;
      (async function fetchData() {
        await getNotes();
        setInitialFetch(false);
      })();
    }

    return () => {
      if (mounted && initialFetch) {
        mounted.current = false;
      }
    };
  }, [initialFetch, category]);

  // fetch on delete
  useEffect(() => {
    if (noteDeleted && noteDeleteSection?.roomId === roomId) {
      (async function fetchData() {
        await getNotes();
        setNoteDeleted(false);
        setNoteDeleteSection(undefined);
      })();
    }
  }, [noteDeleted, category]);

  // set most recent note text as a placeholder
  useEffect(() => {
    if (notes?.length > 0) {
      const { body } = notes[0];

      setLatestNote(body);
    }
  }, [notes]);

  // open and close the notes
  const onToggleAccordion = useCallback(() => setIsOpenNotes((prevState) => !prevState), []);

  // on creating a room refresh the list and clear the form
  const onNoteCreated = useCallback(async () => {
    setNoteText('');
    await getNotes();
  }, [category]);

  // Note form functions
  const onChangeNoteText = useCallback(({ target: { value } }: any) => {
    if (value.length <= 255) {
      setNoteText(value);
    }
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      setDisablePostButton(true);
      setTimeout(() => {
        setDisablePostButton(false);
      }, 1000);
      const body = {
        body: noteText,
        category_id: category,
      };
      if (!category) delete body.category_id;
      dispatch(createRoomNote(roomId, body, onNoteCreated));
    },
    [noteText, category]
  );

  const onClickDeleteIcon = useCallback((id: number) => {
    setNoteId(id);
    setIsOpenDeleteNoteModal(true);
    setNoteDeleteSection({ roomId });
  }, []);

  return (
    <div className={classes.roomNotesBase}>
      <h4 className={classes.roomNotesHeader}>{title}</h4>
      <NotesDropdown
        type="room"
        isOpen={isOpenNotes}
        placeholder={latestNote}
        totalNoteCount={totalNotes}
        hasBookmarked={hasBookmarked}
        hasFlagged={hasFlagged}
        onToggleClick={onToggleAccordion}
      >
        <NoteItems notes={notes} isReadOnly={isReadOnly} onClickDeleteIcon={onClickDeleteIcon} />
        {totalNotes > 2 && notes.length >= 2 && totalNotes - notes.length > 0 && (
          <LoadMoreNotesButton totalNotes={totalNotes - notes.length} loadMoreNotesClick={onClickLoadMore} />
        )}
        <Spinner loading={fetching} />
        <div className={classes.createNoteForm}>
          <CreateNoteForm
            errors={errors}
            noteText={noteText}
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

RoomNotesContainer.defaultProps = {
  hasBookmarked: undefined,
  hasFlagged: undefined,
  notesCount: 0,
  category: 0,
};

const RoomNotesContainerMemo = memo(RoomNotesContainer, areEqual);

export { RoomNotesContainerMemo as RoomNotesContainer };
