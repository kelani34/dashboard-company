import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { width } from 'Utils/screen';
import { Tab } from '../Tab';
import classes from './projectTabMenu.module.css';

interface Props {
  id?: string;
  selectedMainTab?: string;
  className?: string;
  children?: ReactNode;
  onMainTabsClick?: (e: any) => void;
}

const createTabs = (activeTab: string, onTabClick: (e: any) => void) => (
  <>
    {/*
    <Tab
      key="project-dash-tab"
      id="project-dash-tab"
      className={`${classes.flexCenter} ${classes.tabItem} ${
        activeTab === "project-dash-tab" ? `active ${classes["active-Tab"]}` : ""
      }`}
      target="project-dash"
      onClick={onTabClick}
    >
      <span>Project Dashboard</span>
    </Tab>
    */}
    <Tab
      key="photo-center-tab"
      id="photo-center-tab"
      className={`${classes.flexCenter} ${classes.tabItem} ${
        activeTab === 'photo-center-tab' ? `active ${classes['active-Tab']}` : ''
      }`}
      target="photo-center"
      onClick={onTabClick}
    >
      <span>Photo Management</span>
    </Tab>
  </>
);

/*
  In order to override bootstraps active class on tabs, there is a click event onTabClick, which will get the name of the tab that was clicked
  and then trigger a re-render.  Note in the createTabs method above, where the active class is added or not, based on which tab was clicked.
*/
const ProjectTabMenu = ({
  id = 'tabs',
  selectedMainTab = '/projectManagement',
  className,
  children,
  onMainTabsClick,
}: Props) => (
  // We want to set the initial active tab to the first tab in the incoming tabList
  // const [activeTab] = useState(selectedMainTab);
  // const onTabClick = (e: any) => {
  //   // Occasionally, e.currentTarget is undefined.  Set the current activeTab if we run into this bug
  //
  //   setActiveTab(e?.currentTarget?.id || activeTab);
  // };

  <div className="container-fluid">
    <div className="row">
      <div className="col">
        <div className={classes.projectsTabWrapper}>
          <div className={classes.tabsContainer}>
            <ul
              className={`nav nav-tabs ${width < 576 ? 'flex-sm-column' : 'width'}   ${classes.tabs} ${
                className || ''
              }`}
              id={id}
              role="tablist"
            >
              {createTabs(selectedMainTab, onMainTabsClick)}
            </ul>
          </div>
          <div className="tab-content w-100 h-100 d-inline-block" id="myTabContent" style={{ height: 'auto' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);
ProjectTabMenu.defaultProps = {
  id: undefined,
  className: undefined,
  children: undefined,
  selectedMainTab: undefined,
  onMainTabsClick: undefined,
};
const ProjectTabMenuMemo = memo(ProjectTabMenu, areEqual);
export { ProjectTabMenuMemo as ProjectTabMenu };
