import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { SingleProjectProvider } from 'Context/Project';
import { ProjectTabsLayout } from 'Containers/Layouts/ProjectTabsLayout';
import { TabContent } from 'Components/Tabs';

import { NotesProvider } from 'Context/Notes';
import classes from './rocketScanWrapper.module.css';

interface Props {
  children: ReactNode;
}

const RocketScanWrapper = ({ children }: Props) => (
  <SingleProjectProvider tab="rocketscan">
    <ProjectTabsLayout tab="rocketscan">
      <TabContent id="rocketscan" className={`active show position-relative ${classes.tabContent}`}>
        <NotesProvider>{children}</NotesProvider>
      </TabContent>
    </ProjectTabsLayout>
  </SingleProjectProvider>
);

const RocketScanWrapperMemo = memo(RocketScanWrapper, areEqual);

export { RocketScanWrapperMemo as RocketScanWrapper };
