import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';

import { ExternalAtmosphericTable } from 'Components/RocketDry';
import { SpinnerBlock } from 'Components/SpinnerBlock';

import { externalAtmosphericTableHeaders } from 'Utils/table';

import { getProjectAtmosphericLogs } from 'Containers/RocketDry/actions';

import { projectSelector } from 'Containers/RocketScan/selectors';
import { projectAtmosphericLogsSelector } from 'Containers/RocketDry/selectors';

import classes from './externalAtmosphericTable.module.css';

const ExternalAtmosphericTableContainer = () => {
  const dispatch = useDispatch();

  // selectors
  const project = useSelector(projectSelector, areEqual);
  const atmosphericLogs = useSelector(projectAtmosphericLogsSelector, areEqual);

  // local variables
  const [fetching, setFetching] = useState(false);

  const getReports = useCallback(() => {
    const { id: projectId } = project;

    dispatch(getProjectAtmosphericLogs(projectId, setFetching));
  }, [project]);

  useEffect(() => {
    if (project?.id) {
      getReports();
    }
  }, [project]);

  return (
    <>
      <SpinnerBlock fetching={fetching} />
      {!fetching && <ExternalAtmosphericTable headers={externalAtmosphericTableHeaders} logs={atmosphericLogs} />}
    </>
  );
};

const ExternalAtmosphericTableContainerMemo = memo(ExternalAtmosphericTableContainer, areEqual);

export { ExternalAtmosphericTableContainerMemo as ExternalAtmosphericTable };
