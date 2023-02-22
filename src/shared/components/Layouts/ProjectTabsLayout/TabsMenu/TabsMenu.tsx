import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Tab } from 'Components/Tabs/Tab';

import { width } from 'Utils/screen';
import classes from './tabsMenu.module.css';

interface Props {
  activeTab: string;
  tabs: any[];
  onTabClick: (tab: string) => void;
}

const TabsMenu = ({ activeTab, tabs, onTabClick }: Props) => (
  <ul
    className={`nav nav-tabs pr-4 ${width < 576 ? 'flex-sm-column' : 'width'} border-bottom-0`}
    id="single-project-tabs"
    role="tablist"
  >
    {tabs.map(({ title, tab }: any) => (
      <Tab
        key={tab}
        id={tab}
        className={`${classes.flexCenter} ${classes.button} ${
          activeTab === tab ? `active ${classes['active-Tab']}` : ''
        }`}
        target={tab}
        onClick={() => onTabClick(tab)} // limited usage, not recommend for reusable components
      >
        <span>{title}</span>
      </Tab>
    ))}
  </ul>
);

const TabsMenuMemo = memo(TabsMenu, areEqual);

export { TabsMenuMemo as TabsMenu };
