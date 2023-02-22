import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { ProjectsTabMenu } from 'Components/Tabs';

import { MyProjects, WipProjects, CompletedProjects, PhotoDownloadModal } from 'Containers/Projects';

interface Props {
  onClickRow?: (e: any) => void;
}

const ProjectsTabsContainer = ({ onClickRow }: Props) => (
  <>
    <ProjectsTabMenu id="projects-tabs">
      <MyProjects onClickRow={onClickRow} />
      <WipProjects onClickRow={onClickRow} />
      <CompletedProjects onClickRow={onClickRow} />
    </ProjectsTabMenu>
    <PhotoDownloadModal />
  </>
);

ProjectsTabsContainer.defaultProps = {
  onClickRow: null,
};

const ProjectsTabsContainerMemo = memo(ProjectsTabsContainer, areEqual);

export { ProjectsTabsContainerMemo as ProjectsTabs };
