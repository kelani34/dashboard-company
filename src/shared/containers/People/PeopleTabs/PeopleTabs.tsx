import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { PeopleTabs } from 'Components/Tabs';

import { EmployeesTab, ContactsTab } from 'Containers/People/PeopleTabs';

const PeopleTabsContainer = () => (
  <PeopleTabs id="people-tabs">
    <EmployeesTab />
    <ContactsTab />
  </PeopleTabs>
);

PeopleTabsContainer.defaultProps = {};

const PeopleTabsContainerMemo = memo(PeopleTabsContainer, areEqual);

export { PeopleTabsContainerMemo as PeopleTabs };
