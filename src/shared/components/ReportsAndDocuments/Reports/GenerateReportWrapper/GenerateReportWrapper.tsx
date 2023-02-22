import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { ProjectTabsLayout } from 'Containers/Layouts';
import { TabContent } from 'Components/Tabs';
import { SingleProjectProvider } from 'Context/Project';
import classes from './generateReportWrapper.module.css';

interface Props {
  children: ReactNode;
}

const GenerateReportWrapper = ({ children }: Props) => (
  <SingleProjectProvider tab="rocketreports">
    <ProjectTabsLayout tab="rocketreports">
      <TabContent id="rocketreports" className={`active show position-relative ${classes.tabContent}`}>
        {children}
      </TabContent>
    </ProjectTabsLayout>
  </SingleProjectProvider>
);

const GenerateReportWrapperMemo = memo(GenerateReportWrapper, areEqual);

export { GenerateReportWrapperMemo as GenerateReportWrapper };
