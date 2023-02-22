import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Table, TableBody, TableColumn, TableRow } from 'Components/Table';
import { TableHead } from 'Containers/Table';

import { formatDate } from 'Utils/helpers';
import { NoRecordingsPlaceholder } from 'Components/RocketDry';

import classes from './moistureLogsTable.module.css';

interface Props {
  headers: any[];
  logs: any;
  materialName?: string;
}

const MoistureLogsTable = ({ headers, logs, materialName }: Props) => (
  <div className={classes.tableBase}>
    <Table className="table w-100">
      <TableHead headers={headers} sortBy="date" onClickSort={() => {}} />
      {logs?.length > 0 && (
        <TableBody>
          {logs.map((log: any, index) => (
            <TableRow key={log.id}>
              <TableColumn className={classes.tableColumn}>{index === 0 ? materialName : ''}</TableColumn>
              <TableColumn className={classes.tableColumn}>{formatDate(log?.created_at, 'PP')}</TableColumn>
              <TableColumn className={classes.tableColumn}>{log.drying_goal}</TableColumn>
              <TableColumn
                className={`${classes.tableColumn} ${classes.colorCell}`}
                tdClassName={`${log.reading <= log.drying_goal ? classes.green : classes.red}`}
              >
                {log.reading}
              </TableColumn>
              {/* <TableColumn className={classes.tableColumn}>view photo icon</TableColumn> */}
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
    {logs?.length === 0 && <NoRecordingsPlaceholder />}
  </div>
);

MoistureLogsTable.defaultProps = {
  materialName: undefined,
};

const MoistureLogsTableMemo = memo(MoistureLogsTable, areEqual);

export { MoistureLogsTableMemo as MoistureLogsTable };
