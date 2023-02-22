import React, { memo, ReactNode, useEffect, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { width } from 'Utils/screen';
import { Tab } from '../Tab';
import classes from './multiUnit.tabs.module.css';

interface Props {
  id?: string;
  className?: string;
  selectedTab?: string;
  children?: ReactNode;
  triggerButtonClick?: boolean;
  onTabSelect?: (e: any) => void;
}

/*
  Custom Tab for Locations
*/

const createTabs = (activeTab: string, triggerButtonClick: boolean, onTabClick: (e: any) => void) => (
  <>
    <Tab
      key="all-units-tab"
      id="unit"
      className={`${classes.flexCenter} ${classes.navTabs} ${
        activeTab === 'unit' ? `active ${classes['active-Tab']}` : ''
      }`}
      target="all-units"
      triggerButtonClick={triggerButtonClick}
      onClick={() => onTabClick('unit')}
    >
      <span>Units</span>
    </Tab>
    <Tab
      key="all-floors-tab"
      id="floor"
      className={`${classes.flexCenter} ${classes.navTabs} ${
        activeTab === 'floor' ? `active ${classes['active-Tab']}` : ''
      }`}
      target="all-floors"
      triggerButtonClick={triggerButtonClick}
      onClick={() => onTabClick('floor')}
    >
      <span>Floors/Common Areas</span>
    </Tab>
  </>
);

/*
  In order to override bootstraps active class on tabs, there is a click event onTabClick, which will get the name of the tab that was clicked
  and then trigger a re-render.  Note in the createTabs method above, where the active class is added or not, based on which tab was clicked.
*/

const MultiUnitTabs = ({ id, className, children, selectedTab, triggerButtonClick, onTabSelect }: Props) => {
  // We want to set the initial active tab to the first tab in the incoming tabList
  const [activeTab, setActiveTab] = useState('unit');

  useEffect(() => {
    if (selectedTab) {
      setActiveTab(selectedTab);
    }
  }, [selectedTab]);

  const onTabClick = (tab: string) => {
    // Occasionally, e.currentTarget is undefined.  Set the current activeTab if we run into this bug
    setActiveTab(tab);

    // Fire any custom methods executed on tab select
    if (onTabSelect) onTabSelect(tab);
  };

  return (
    <div className="container-fluid mt-4 p-0">
      <div className="row">
        <div className={`col ${classes.tabsContainer}`}>
          <ul
            className={`nav nav-tabs ${width < 576 ? 'flex-sm-column' : 'width'}   ${classes.tabs} ${className || ''}`}
            id={id}
            role="tablist"
          >
            {createTabs(activeTab, triggerButtonClick, onTabClick)}
          </ul>
          {/* {photoGalleryView && <div className={classes.seeAllTab}>See All</div>} */}
        </div>
        <div className="tab-content w-100 h-100 d-inline-block" style={{ height: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

MultiUnitTabs.defaultProps = {
  id: undefined,
  selectedTab: undefined,
  className: undefined,
  children: undefined,
  triggerButtonClick: undefined,
  // photoGalleryView: false,
  onTabSelect: undefined,
};
const MultiUnitTabsMemo = memo(MultiUnitTabs, areEqual);
export { MultiUnitTabsMemo as MultiUnitTabs };
