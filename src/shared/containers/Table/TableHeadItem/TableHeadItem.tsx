import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { TableHeadItem } from 'Components/Table';

type Header = {
  id: number;
  displayName: string;
  column: string;
  canSort: boolean;
  action: boolean;
};

interface Props {
  header: Header;
  sortBy: string;
  onClickSort: (e: any) => void;
}

const TableHeadItemContainer = ({ header, sortBy, onClickSort }: Props) => {
  const { displayName, column, canSort, action } = header;

  const onClick = useCallback(() => {
    onClickSort(`-${column}`);
  }, []);

  return (
    <TableHeadItem
      displayName={displayName}
      column={column}
      sortBy={sortBy}
      canSort={canSort}
      action={action}
      onClick={onClick}
    />
  );
};

const TableHeadItemContainerMemo = memo(TableHeadItemContainer, areEqual);

export { TableHeadItemContainerMemo as TableHeadItemContainer };
