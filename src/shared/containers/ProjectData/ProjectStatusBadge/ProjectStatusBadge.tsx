import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { PillBadge } from 'Components/PillBadge';

import { projectSelector } from 'Containers/RocketScan/selectors';

const ProjectStatusBadge = () => {
  const project = useSelector(projectSelector, areEqual);

  if (project.projectStatus?.name === 'wip') {
    return <PillBadge text="WIP" />;
  }
  if (project.projectStatus?.name === 'completed') {
    return <PillBadge text="Completed" />;
  }
  return <></>;
};

const ProjectStatusBadgeMemo = memo(ProjectStatusBadge, areEqual);

export { ProjectStatusBadgeMemo as ProjectStatusBadge };
