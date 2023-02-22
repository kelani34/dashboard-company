import { Icon } from 'Components/Icons';
import React, { memo, ReactNode, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { width } from 'Utils/screen';
import { Tab } from '../Tab';
import classes from './people.tabs.module.css';

interface Props {
  id?: string;
  className?: string;
  children?: ReactNode;
}

const createTabs = (activeTab: string, onTabClick: (e: any) => void) => (
  <>
    <Tab
      key="employees-tab"
      id="employees-tab"
      className={`${classes.flexCenter} ${classes.button} ${
        activeTab === 'employees-tab' ? `active ${classes['active-Tab']}` : ''
      }`}
      target="employees"
      onClick={onTabClick}
    >
      <>
        <Icon type="people" className={classes.icon} />
        <span>Employees</span>
      </>
    </Tab>
    <Tab
      key="contacts-tab"
      id="contacts-tab"
      className={`${classes.flexCenter} ${classes.button} ${
        activeTab === 'contacts-tab' ? `active ${classes['active-Tab']}` : ''
      }`}
      target="contacts"
      onClick={onTabClick}
    >
      <>
        <div className={classes['icon-phone']}>
          <Icon type="phone" className={classes.icon} />
        </div>
        <span>Contacts</span>
      </>
    </Tab>
  </>
);

/*
  In order to override bootstraps active class on tabs, there is a click event onTabClick, which will get the name of the tab that was clicked
  and then trigger a re-render.  Note in the createTabs method above, where the active class is added or not, based on which tab was clicked.
*/
const PeopleTabs = ({ id = 'tabs', className, children }: Props) => {
  // We want to set the initial active tab to the first tab in the incoming tabList
  const [activeTab, setActiveTab] = useState('employees-tab');

  const onTabClick = (e: any) => {
    // Occasionally, e.currentTarget is undefined.  Set the current activeTab if we run into this bug
    setActiveTab(e?.currentTarget?.id || activeTab);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className={classes.peopleTabWrapper}>
            <div className={classes.tabsContainer}>
              <ul
                className={`nav nav-tabs ${width < 576 ? 'flex-sm-column' : 'width'}   ${classes.tabs} ${
                  className || ''
                }`}
                id={id}
                role="tablist"
              >
                {createTabs(activeTab, onTabClick)}
              </ul>
            </div>
            <div className="tab-content w-100 h-100 d-inline-block" id="peopleTabContent" style={{ height: 'auto' }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PeopleTabs.defaultProps = {
  id: undefined,
  className: undefined,
  children: undefined,
};
const PeopleTabsMemo = memo(PeopleTabs, areEqual);
export { PeopleTabsMemo as PeopleTabs };
