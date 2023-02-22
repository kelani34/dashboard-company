import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Table, TableBody, TableColumn, TableRow } from 'Components/Table';
import { TableHead } from 'Containers/Table';

import { formatDate } from 'Utils/helpers';
import { NoRecordingsPlaceholder } from 'Components/RocketDry';

import classes from './externalAtmosphericTable.module.css';

interface Props {
  headers: any[];
  logs: any;
}

const ExternalAtmosphericTable = ({ headers, logs }: Props) => (
  <div className={classes.tableBase}>
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
              <TableColumn className={classes.tableColumn}>{log.pressure} kPA</TableColumn>
              <TableColumn className={classes.tableColumn}>{log.wind_speed} mph</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
    {logs?.length === 0 && <NoRecordingsPlaceholder />}
  </div>
);

const ExternalAtmosphericTableMemo = memo(ExternalAtmosphericTable, areEqual);

export { ExternalAtmosphericTableMemo as ExternalAtmosphericTable };
