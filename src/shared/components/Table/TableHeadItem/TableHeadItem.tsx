import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';
import { Th } from 'Components/Table';

import classes from './tableHeadItem.module.css';

interface Props {
  displayName: string;
  column: string;
  sortBy: string;
  canSort: boolean;
  action: boolean;
  onClick: (e: any) => void;
}

const TableHeadItem = ({ displayName, column, sortBy, canSort, action, onClick }: Props) => (
  <Th>
    <span
      className={`${classes.thSpan} ${!canSort ? classes.canSort : ''} ${action ? classes.action : ''}`}
      role="button"
      tabIndex={-1}
      onClick={onClick}
      onKeyUp={onClick}
    >
      {displayName}
      {canSort &&
        (sortBy === column ? (
          <Icon className={classes.sortIcon} type="caretup" />
        ) : (
          <Icon className={classes.sortIcon} type="caretdown" />
        ))}
    </span>
  </Th>
);

const TableHeadItemMemo = memo(TableHeadItem, areEqual);

export { TableHeadItemMemo as TableHeadItem };
