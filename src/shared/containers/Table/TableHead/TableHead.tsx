import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { TableHeadItem } from 'Containers/Table';
import { TableHeader, TableRow } from 'Components/Table';

interface Props {
  headers: any[];
  sortBy: string;
  onClickSort: (e: any) => void;
}

const TableHeadContainer = ({ headers, sortBy, onClickSort }: Props) => (
  <TableHeader>
    <TableRow>
      {headers.map((header: any) => (
        <TableHeadItem key={header.id} header={header} sortBy={sortBy} onClickSort={onClickSort} />
      ))}
    </TableRow>
  </TableHeader>
);

const TableHeadContainerMemo = memo(TableHeadContainer, areEqual);

export { TableHeadContainerMemo as TableHeadContainer };
