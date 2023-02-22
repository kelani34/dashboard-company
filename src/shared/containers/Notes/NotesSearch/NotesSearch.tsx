import React, { memo } from 'react';
import { useNotesFunctions } from 'Context/Notes';
import { areEqual } from 'Utils/equalityChecks';

import { SearchBox } from 'Components/SearchBox';

import classes from './notesSearch.module.css';

const NotesSearchContainer = () => {
  // get note delete and filter related functions
  const { searchBoxRef, searchValue, onChangeSearchValue, onClickClearButton }: any = useNotesFunctions();

  return (
    <div className={classes.notesSearchBase}>
      <SearchBox
        id="notes-search-box"
        ref={searchBoxRef}
        value={searchValue}
        placeholder="Search Notes ..."
        name="search"
        ariaLabel="Search notes"
        onChangeValue={onChangeSearchValue}
        onClickClearButton={onClickClearButton}
      />
    </div>
  );
};

const NotesSearchContainerMemo = memo(NotesSearchContainer, areEqual);

export { NotesSearchContainerMemo as NotesSearchContainer };
