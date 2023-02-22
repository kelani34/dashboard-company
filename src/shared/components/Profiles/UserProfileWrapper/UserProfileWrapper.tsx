import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { TabContent } from 'Components/Tabs';
import { UserTabsLayout } from 'Components/Layouts/UserTabsLayout';

import classes from './userProfileWrapper.module.css';

interface Props {
  tab: string;
  children: ReactNode;
}

const UserProfileWrapperContainer = ({ children, tab }: Props) => (
  <UserTabsLayout tab={tab}>
    <TabContent id="userprofile" className={`active show position-relative ${classes.tabContent}`}>
      {children}
    </TabContent>
  </UserTabsLayout>
);

const UserProfileWrapperContainerMemo = memo(UserProfileWrapperContainer, areEqual);

export { UserProfileWrapperContainerMemo as UserProfileWrapper };
