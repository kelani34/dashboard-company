import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { ProjectDataWrapper, ClaimsDataWrapper, LossDataWrapper } from 'Components/ProjectData';
import { ProjectDataHeader } from 'Containers/ProjectData';

import { PropertyDataWrapper } from 'Components/ProjectData/PropertyDataWrapper';

const ProjectData = () => (
  <ProjectDataWrapper>
    <ProjectDataHeader />
    <PropertyDataWrapper />
    <LossDataWrapper />
    <ClaimsDataWrapper />
  </ProjectDataWrapper>
);

const ProjectDataMemo = memo(ProjectData, areEqual);

export { ProjectDataMemo as ProjectData };
