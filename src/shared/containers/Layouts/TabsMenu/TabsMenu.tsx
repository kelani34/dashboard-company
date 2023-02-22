import React, { memo, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { TabsMenu } from 'Components/TabsMenu';

import { userFeatureFlagsSelector } from 'Containers/User/selector';

interface Props {
  activeTab: string;
  tabs: any[];
  onTabClick: (tab: string) => void;
}

const TabsMenuContainer = ({ activeTab, tabs, onTabClick }: Props) => {
  // user feature flags for showing specific tabs
  const { projectLossInfo, rocketReports } = useSelector(userFeatureFlagsSelector, areEqual);

  const [availableTabs, setAvailableTabs] = useState([]);

  useLayoutEffect(() => {
    let filtered = tabs;
    if (!projectLossInfo) {
      filtered = tabs.filter((tabObject) => tabObject.tab !== 'project-data');
    }
    if (!rocketReports) {
      filtered = filtered.filter((tabObject) => tabObject.tab !== 'rocketreportss');
    }

    setAvailableTabs(filtered);
  }, [rocketReports, projectLossInfo]);

  return <TabsMenu activeTab={activeTab} tabs={availableTabs} onTabClick={onTabClick} />;
};

const TabsMenuContainerMemo = memo(TabsMenuContainer, areEqual);
export { TabsMenuContainerMemo as TabsMenu };
