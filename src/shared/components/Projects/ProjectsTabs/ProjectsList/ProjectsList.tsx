import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Table, TableBody, TableColumn, TableHeader, TableRow, Th } from 'Components/Table';
import { CompanyProjectsDataModal, CompanyProjectsModal } from 'Containers/Projects/Modals/CompanyProjectsModal';
import { formatDate } from 'Utils/helpers';

import { Icon } from 'Components/Icons';
import { DownloadProject, NoProjectsTable } from 'Containers/Projects';
import classes from './projectsList.module.css';

interface Props {
  iconType?: string;
  sortBy?: string;
  projects: CompanyProjectsDataModal;
  onClickRow?: (e: any) => void;
  onClickSort?: (sort: string) => void;
}

const ProjectsList = ({ iconType, sortBy, projects, onClickRow, onClickSort }: Props) =>
  projects?.data?.length > 0 ? (
    <Table className={`table ${classes.projectListWrapper}`}>
      <TableHeader>
        <TableRow>
          <Th>Address</Th>
          <Th>
            <span
              className={classes.thSpan}
              role="button"
              tabIndex={-1}
              onClick={() => onClickSort('-uid')}
              onKeyUp={() => onClickSort('-uid')}
            >
              Project Number
              {sortBy === '-uid' ? (
                <Icon className={classes.sortIcon} type="caretup" />
              ) : (
                <Icon className={classes.sortIcon} type="caretdown" />
              )}
            </span>
          </Th>
          <Th>
            <span
              className={classes.thSpan}
              role="button"
              tabIndex={-1}
              onClick={() => onClickSort('-alias')}
              onKeyUp={() => onClickSort('-alias')}
            >
              Project Alias
              {sortBy === '-alias' ? (
                <Icon className={classes.sortIcon} type="caretup" />
              ) : (
                <Icon className={classes.sortIcon} type="caretdown" />
              )}
            </span>
          </Th>
          <Th>
            <span
              className={classes.thSpan}
              role="button"
              tabIndex={-1}
              onClick={() => onClickSort('-created_at')}
              onKeyUp={() => onClickSort('-uid')}
            >
              Date Created
              {sortBy === '-created_at' ? (
                <Icon className={classes.sortIcon} type="caretup" />
              ) : (
                <Icon className={classes.sortIcon} type="caretdown" />
              )}
            </span>
          </Th>
          <Th />
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.data.map(
          ({
            id,
            address: { address: addressPrimary, address_2: addressSecondary, city, state, zip },
            uid,
            alias,
            created_at: createdAt,
          }: CompanyProjectsModal) => (
            <TableRow key={id}>
              <TableColumn dataId={id} tdOnClick={onClickRow}>
                <div className={classes.address}>
                  <p className={classes.street}>{`${addressPrimary}, ${addressSecondary || ''}`}</p>
                  <p className={classes.region}>{`${city}, ${state}, ${zip}`}</p>
                </div>
              </TableColumn>

              <TableColumn dataId={id} tdOnClick={onClickRow} className={classes.columnContent}>
                <p className={classes.numberAndDate}>{uid}</p>
              </TableColumn>
              <TableColumn dataId={id} tdOnClick={onClickRow} className={classes.columnContent}>
                <p className={classes.numberAndDate}>{alias}</p>
              </TableColumn>
              <TableColumn dataId={id} tdOnClick={onClickRow} className={classes.columnContent}>
                <p className={classes.numberAndDate}>{formatDate(createdAt, 'PP')}</p>
              </TableColumn>
              <TableColumn>
                <DownloadProject projectId={id} />
              </TableColumn>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  ) : (
    <NoProjectsTable iconType={iconType} />
  );

ProjectsList.defaultProps = {
  iconType: 'my',
  sortBy: null,
  onClickRow: null,
  onClickSort: null,
};

const ProjectsListMemo = memo(ProjectsList, areEqual);

export { ProjectsListMemo as ProjectsList };
