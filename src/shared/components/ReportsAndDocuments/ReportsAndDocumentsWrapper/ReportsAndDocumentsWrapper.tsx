import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { SingleProjectProvider } from 'Context/Project';
import { ProjectTabsLayout } from 'Containers/Layouts';
import { TabContent } from 'Components/Tabs';

import classes from './reportsAndDocumentsWrapper.module.css';

interface Props {
  children: ReactNode;
}

const ReportsAndDocumentsWrapper = ({ children }: Props) => (
  <SingleProjectProvider tab="rocketreports">
    <ProjectTabsLayout tab="rocketreports">
      <TabContent id="rocketreports" className={`active show position-relative ${classes.tabContent}`}>
        {children}
      </TabContent>
    </ProjectTabsLayout>
  </SingleProjectProvider>
);

const ReportsAndDocumentsWrapperMemo = memo(ReportsAndDocumentsWrapper, areEqual);

export { ReportsAndDocumentsWrapperMemo as ReportsAndDocumentsWrapper };
