import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { SingleProjectProvider } from 'Context/Project';
import { ProjectTabsLayout } from 'Containers/Layouts/ProjectTabsLayout';
import { TabContent } from 'Components/Tabs';
import { RocketDryProvider } from 'Context/RocketDry';

import classes from './rocketDryWrapper.module.css';

interface Props {
  children: ReactNode;
}

const RocketDryWrapper = ({ children }: Props) => (
  <SingleProjectProvider tab="rocketdry">
    <ProjectTabsLayout tab="rocketdry">
      <TabContent id="rocketdry" className={`active show position-relative ${classes.tabContent}`}>
        <RocketDryProvider>{children}</RocketDryProvider>
      </TabContent>
    </ProjectTabsLayout>
  </SingleProjectProvider>
);

const RocketDryWrapperMemo = memo(RocketDryWrapper, areEqual);

export { RocketDryWrapperMemo as RocketDryWrapper };
