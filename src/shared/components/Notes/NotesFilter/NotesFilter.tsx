import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { Button } from 'Components/Button';

import classes from './notesFilter.module.css';

interface Props {
  filterBookmarked: boolean;
  filterFlagged: boolean;
  onClickBookmarkFilter: (e: any) => void;
  onClickFlaggedFilter: (e: any) => void;
}

const NotesFilter = ({ filterBookmarked, filterFlagged, onClickBookmarkFilter, onClickFlaggedFilter }: Props) => (
  <div className={classes.notesFilter}>
    View Only
    <Button className={`${classes.filterButton} ${filterFlagged ? classes.active : ''}`} onClick={onClickFlaggedFilter}>
      <Icon type="flag" />
    </Button>
    <Button
      className={`${classes.filterButton} ${filterBookmarked ? classes.active : ''}`}
      onClick={onClickBookmarkFilter}
    >
      <Icon type="bookmark" />
    </Button>
  </div>
);

const NotesFilterMemo = memo(NotesFilter, areEqual);

export { NotesFilterMemo as NotesFilter };
