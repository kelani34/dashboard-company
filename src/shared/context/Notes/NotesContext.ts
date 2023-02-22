import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { deleteNote } from 'Containers/Notes/actions';
import { useDispatch } from 'react-redux';
import { debounce } from 'Utils/debounce';

export const NotesFormContext = createContext({});

export const NotesFormFunctions = () => {
  const dispatch = useDispatch();

  const [noteId, setNoteId] = useState(undefined);
  const [noteDeleted, setNoteDeleted] = useState(false);
  const [noteDeleteSection, setNoteDeleteSection] = useState(undefined);
  const [isOpenDeleteNoteModal, setIsOpenDeleteNoteModal] = useState(false);
  const [filterBookmarked, setFilterBookmarked] = useState(false);
  const [filterFlagged, setFilterFlagged] = useState(false);

  const closeDeleteNoteModalClick = useCallback(() => {
    setIsOpenDeleteNoteModal(false);
  }, []);

  const onNoteDeleted = useCallback(() => {
    setIsOpenDeleteNoteModal(false);
    setNoteDeleted(true);
  }, []);

  const onDeleteButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();
      dispatch(deleteNote(noteId, onNoteDeleted));
    },
    [noteId, filterBookmarked, filterFlagged]
  );

  return {
    noteId,
    setNoteId,
    noteDeleted,
    noteDeleteSection,
    setNoteDeleted,
    isOpenDeleteNoteModal,
    onDeleteButtonClick,
    setIsOpenDeleteNoteModal,
    closeDeleteNoteModalClick,
    setNoteDeleteSection,
    filterBookmarked,
    filterFlagged,
    setFilterBookmarked,
    setFilterFlagged,
  };
};

export const NotesSearchFunctions = () => {
  const [searchValue, setSearchValue] = useState('');

  const searchBoxRef = useRef(null);

  // handle search box value change
  const handleSearchValueChange = ({ target: { value } }: any) => {
    if (value.length <= 24) {
      setSearchValue(value);
    }
  };

  // debounce function on search value change
  const onChangeSearchValue = useMemo(() => debounce(handleSearchValueChange, 300), []);

  const onClickClearButton = useCallback(() => {
    searchBoxRef.current.value = '';
    setSearchValue('');
  }, []);

  return {
    searchValue,
    searchBoxRef,
    onChangeSearchValue,
    onClickClearButton,
  };
};

export const useNotesFunctions = () => useContext(NotesFormContext);
