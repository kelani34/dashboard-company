import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { NotesFilter } from 'Components/Notes';
import { useNotesFunctions } from 'Context/Notes';

const NotesFilterContainer = () => {
  // get note filter related functions
  const { filterBookmarked, filterFlagged, setFilterBookmarked, setFilterFlagged }: any = useNotesFunctions();

  const onClickBookmarkFilter = useCallback(() => {
    setFilterBookmarked((prev) => !prev);
  }, []);

  const onClickFlaggedFilter = useCallback(() => {
    setFilterFlagged((prev) => !prev);
  }, []);

  return (
    <NotesFilter
      filterBookmarked={filterBookmarked}
      filterFlagged={filterFlagged}
      onClickBookmarkFilter={onClickBookmarkFilter}
      onClickFlaggedFilter={onClickFlaggedFilter}
    />
  );
};

const NotesFilterContainerMemo = memo(NotesFilterContainer, areEqual);

export { NotesFilterContainerMemo as NotesFilterContainer };
