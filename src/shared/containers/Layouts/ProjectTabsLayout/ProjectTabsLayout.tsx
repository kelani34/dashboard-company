import React, { memo, ReactNode, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { projectIdSelector, projectUnavailableSelector } from 'Containers/RocketScan/selectors';

import { ProjectTabsLayout } from 'Components/Layouts/ProjectTabsLayout';

interface Props {
  tab: string;
  children: ReactNode;
}

const ProjectTabsLayoutContainer = ({ children, tab }: Props) => {
  const history = useHistory();

  const projectId = useSelector(projectIdSelector);
  const projectUnavailable = useSelector(projectUnavailableSelector);

  // redirect to the specific tab route
  const onTabClick = useCallback(
    (tab: string) => {
      history.push(`/projects/${projectId}/${tab}`);
    },
    [projectId]
  );

  return (
    <ProjectTabsLayout tab={tab} projectUnavailable={projectUnavailable} onTabClick={onTabClick}>
      {children}
    </ProjectTabsLayout>
  );
};

const ProjectTabsLayoutContainerMemo = memo(ProjectTabsLayoutContainer, areEqual);

export { ProjectTabsLayoutContainerMemo as ProjectTabsLayout };
