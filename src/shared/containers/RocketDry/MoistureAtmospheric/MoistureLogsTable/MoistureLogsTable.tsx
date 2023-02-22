import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { MoistureLogsTable } from 'Components/RocketDry';

import { moistureLogTableHeaders } from 'Utils/table';

interface Props {
  materialWithLogs: any;
}

const MoistureLogsTableContainer = ({ materialWithLogs }: Props) => {
  const { logs, materialName } = materialWithLogs;

  return <MoistureLogsTable headers={moistureLogTableHeaders} logs={logs} materialName={materialName} />;
};

const MoistureLogsTableContainerMemo = memo(MoistureLogsTableContainer, areEqual);

export { MoistureLogsTableContainerMemo as MoistureLogsTableContainer };
