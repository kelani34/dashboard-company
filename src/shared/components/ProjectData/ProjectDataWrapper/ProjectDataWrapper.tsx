import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { SingleProjectProvider } from 'Context/Project';
import { ProjectTabsLayout } from 'Containers/Layouts/ProjectTabsLayout';
import { TabContent } from 'Components/Tabs';

import classes from './projectDataWrapper.module.css';

interface Props {
  children: ReactNode;
}

const ProjectDataWrapper = ({ children }: Props) => (
  <SingleProjectProvider tab="project-data">
    <ProjectTabsLayout tab="project-data">
      <TabContent id="project-data" className={`active show position-relative ${classes.tabContent}`}>
        {children}
      </TabContent>
    </ProjectTabsLayout>
  </SingleProjectProvider>
);

const ProjectDataWrapperMemo = memo(ProjectDataWrapper, areEqual);

export { ProjectDataWrapperMemo as ProjectDataWrapper };
