import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { TabsMenu } from 'Containers/Layouts/TabsMenu';
import { ProjectOptions } from 'Containers/Project';
import { ProjectUnavailable } from 'Components/Project';
import { projectTabs } from 'Utils/tabs';

import classes from './projectTabsLayout.module.css';

interface Props {
  tab: string;
  projectUnavailable: boolean;
  children: ReactNode;
  onTabClick: (tab: string) => void;
}

const ProjectTabsLayout = ({ children, tab, projectUnavailable, onTabClick }: Props) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col">
        <div className={classes.projectsTabWrapper}>
          <div className={classes.tabsContainer}>
            <TabsMenu tabs={projectTabs} activeTab={tab} onTabClick={onTabClick} />
            {!projectUnavailable && <ProjectOptions />}
          </div>
          <div className="tab-content w-100 min-vh-100 d-inline-block" id="single-project-content">
            {projectUnavailable ? <ProjectUnavailable /> : children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectTabsLayoutMemo = memo(ProjectTabsLayout, areEqual);

export { ProjectTabsLayoutMemo as ProjectTabsLayout };
