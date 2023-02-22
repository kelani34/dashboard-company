import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Table, TableBody, TableColumn, TableRow } from 'Components/Table';
import { TableHead } from 'Containers/Table';

import { formatDate } from 'Utils/helpers';

import classes from './internalAtmosphericTable.module.css';

interface Props {
  headers: any[];
  logs: any;
  roomAreaName: string;
}

const InternalAtmosphericTable = ({ headers, logs, roomAreaName }: Props) => (
  <div className={classes.tableBase}>
    {roomAreaName !== 'null' && <div className={classes.roomAreaHeader}>{roomAreaName}</div>}
    <Table className="table w-100">
      <TableHead headers={headers} sortBy="date" onClickSort={() => {}} />
      {logs?.length > 0 && (
        <TableBody>
          {logs.map((log: any) => (
            <TableRow key={log.id}>
              <TableColumn className={classes.tableColumn}>{formatDate(log?.created_at, 'PP')}</TableColumn>
              <TableColumn className={classes.tableColumn}>{log.relative_humidity}%</TableColumn>
              <TableColumn className={classes.tableColumn}>
                {log.temperature}
                °F
              </TableColumn>
              <TableColumn className={classes.tableColumn}>{log.gpp}</TableColumn>
              <TableColumn className={classes.tableColumn}>{log.dew_point}</TableColumn>
              {/* <TableColumn className={classes.tableColumn}>view photo icon</TableColumn> */}
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
    {/* No log placeholder handled by the room container */}
  </div>
);

const InternalAtmosphericTableMemo = memo(InternalAtmosphericTable, areEqual);

export { InternalAtmosphericTableMemo as InternalAtmosphericTable };
