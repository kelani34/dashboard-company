import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { SingleProjectProvider } from 'Context/Project';
import { ProjectTabsLayout } from 'Containers/Layouts/ProjectTabsLayout';
import { TabContent } from 'Components/Tabs';

import classes from './crewWrapper.module.css';

interface Props {
  children: ReactNode;
}

const CrewWrapper = ({ children }: Props) => (
  <SingleProjectProvider tab="crew">
    <ProjectTabsLayout tab="crew">
      <TabContent id="crew" className={`active show position-relative ${classes.tabContent}`}>
        {children}
      </TabContent>
    </ProjectTabsLayout>
  </SingleProjectProvider>
);

const CrewWrapperMemo = memo(CrewWrapper, areEqual);

export { CrewWrapperMemo as CrewWrapper };
