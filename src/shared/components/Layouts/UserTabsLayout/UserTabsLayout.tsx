import React, { memo, ReactNode, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useHistory } from 'react-router-dom';

import { TabsMenu } from 'Components/TabsMenu';
import { userProfileTabs } from 'Utils/tabs';

import classes from './userTabsLayout.module.css';

interface Props {
  tab: string;
  children: ReactNode;
}

const UserTabsLayout = ({ children, tab }: Props) => {
  const history = useHistory();

  // redirect to the specific tab route
  const onTabClick = useCallback((tab: string) => {
    history.push(`/user/${tab}`);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className={classes.userProfileTabWrapper}>
            <div className={classes.tabsContainer}>
              <TabsMenu tabs={userProfileTabs} activeTab={tab} onTabClick={onTabClick} />
            </div>
            <div className="tab-content w-100 mh-100 d-inline-block" id="single-project-content">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserTabsLayoutMemo = memo(UserTabsLayout, areEqual);

export { UserTabsLayoutMemo as UserTabsLayout };
