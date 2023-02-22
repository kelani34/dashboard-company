import React, { memo, useCallback, useEffect } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { ProjectsTabs } from 'Containers/Projects/ProjectsTabs';
import { useHistory } from 'react-router-dom';
import { setSelectedProjectId, setProjectInfoCleared } from 'Containers/Projects/actions';
import { useDispatch } from 'react-redux';
import { clearRoomsObject } from 'Containers/RocketScan/RoomsView/Rooms/actions';
import { setLocation } from 'Containers/RocketScan/MultiUnit/Locations/actions';

const ProjectsContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // clear rooms data on rooms view when switching projects
  useEffect(() => {
    dispatch(clearRoomsObject());
    dispatch(setLocation(undefined));
    dispatch(setProjectInfoCleared(true));
  }, []);

  const onClickRow = useCallback((e: any) => {
    const {
      dataset: { id },
    } = e.currentTarget;

    dispatch(setSelectedProjectId(id));
    history.push(`/projects/${id}/rocketscan`);
  }, []);

  return <ProjectsTabs onClickRow={onClickRow} />;
};

const ProjectsContainerMemo = memo(ProjectsContainer, areEqual);

export { ProjectsContainerMemo as ProjectsContainer };
