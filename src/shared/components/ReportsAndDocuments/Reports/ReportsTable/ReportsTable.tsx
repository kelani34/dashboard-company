import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Table, TableBody, TableColumn, TableRow } from 'Components/Table';
import { TableHead } from 'Containers/Table';

import { Icon } from 'Components/Icons';
import { ReportsEmpty } from 'Components/ReportsAndDocuments';
import { formatDate } from 'Utils/helpers';
import { Pagination } from 'Components/Pagination';
import { ActionButtonWrapper } from 'Containers/ActionButtonWrapper';
import classes from './reportsTable.module.css';

interface Props {
  headers: any[];
  reports: any;
  initialPage: number;
  pageCount: number;
  sortBy: string;
  isCompanyAdmin: boolean;
  onClickSort: (e: any) => void;
  onPageChange: (e: any) => void;
  onDownloadIconClick: (e: any) => void;
  onShareIconClick: (e: any) => void;
  onDeleteIconClick: (e: any) => void;
}

const ReportsTable = ({
  headers,
  reports,
  initialPage,
  pageCount,
  sortBy,
  isCompanyAdmin,
  onClickSort,
  onPageChange,
  onDownloadIconClick,
  onShareIconClick,
  onDeleteIconClick,
}: Props) => (
  <div className={classes.reportsTableBase}>
    <Table className="table w-100">
      <TableHead headers={headers} sortBy={sortBy} onClickSort={onClickSort} />
      {reports?.meta?.total > 0 && (
        <TableBody>
          {reports.data.map((report: any) => (
            <TableRow key={report.id}>
              <TableColumn className={classes.tableColumn}>{report.name}</TableColumn>

              <TableColumn className={classes.tableColumn}>{report?.creator?.full_name || 'John Doe'}</TableColumn>

              <TableColumn className={classes.tableColumn}>{formatDate(report?.created_at, 'PP')}</TableColumn>

              <TableColumn className={classes.tableColumn}>{report?.type}</TableColumn>
              <TableColumn className={classes.tableColumn}>{report?.status}</TableColumn>

              <TableColumn className={classes.tableColumn}>
                <div className="w-100 text-center">
                  <ActionButtonWrapper
                    onClick={onDownloadIconClick}
                    item={report}
                    disabled={report?.status?.toLocaleLowerCase() !== 'completed'}
                  >
                    <Icon type="download" />
                  </ActionButtonWrapper>
                </div>
              </TableColumn>

              <TableColumn className={classes.tableColumn}>
                <div className="w-100 text-center">
                  <ActionButtonWrapper
                    onClick={onShareIconClick}
                    item={report}
                    disabled={report?.status?.toLocaleLowerCase() !== 'completed'}
                  >
                    <Icon type="share32" />
                  </ActionButtonWrapper>
                </div>
              </TableColumn>

              {isCompanyAdmin && (
                <TableColumn className={classes.tableColumn}>
                  <div className="w-100 text-center">
                    <ActionButtonWrapper onClick={onDeleteIconClick} item={report}>
                      <Icon type="trash" />
                    </ActionButtonWrapper>
                  </div>
                </TableColumn>
              )}
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
    {reports?.meta?.total === 0 && <ReportsEmpty />}
    {reports?.meta?.total > 5 && (
      <div className={classes.reportsPaginationBase}>
        <Pagination className="project" initialPage={initialPage} pageCount={pageCount} onPageChange={onPageChange} />
      </div>
    )}
  </div>
);

const ReportsTableMemo = memo(ReportsTable, areEqual);

export { ReportsTableMemo as ReportsTable };
