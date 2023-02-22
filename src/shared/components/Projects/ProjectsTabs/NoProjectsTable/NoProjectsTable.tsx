import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Table, TableHeader, TableRow, Th } from 'Components/Table';
import { Icon } from 'Components/Icons';

import classes from './noProjectsTable.module.css';

interface Props {
  iconType: string;
  searchValue?: string;
}

const NoProjectsTable = ({ iconType, searchValue }: Props) => (
  <div>
    <Table className={`table ${classes.projectListWrapper}`}>
      <TableHeader>
        <TableRow>
          <Th>Address</Th>
          <Th>Project Number</Th>
          <Th>Project Alias</Th>
          <Th>Date Created</Th>
          <Th />
        </TableRow>
      </TableHeader>
    </Table>
    <div className={`d-flex justify-content-center align-items-center flex-column w-100 ${classes.noProjectsContent}`}>
      <p className={classes.noProjectsText}>
        {searchValue?.length >= 2
          ? `No projects found for "${searchValue}".`
          : 'No projects yet. Create a new project.'}
      </p>
      {iconType === 'my' && <Icon type="rocketemblem" />}
      {iconType === 'wip' && <Icon type="rocketemblemtwo" />}
      {iconType === 'completed' && <Icon type="rocketemblemthree" />}
    </div>
  </div>
);

NoProjectsTable.defaultProps = {
  searchValue: '',
};

const NoProjectsTableMemo = memo(NoProjectsTable, areEqual);

export { NoProjectsTableMemo as NoProjectsTable };
