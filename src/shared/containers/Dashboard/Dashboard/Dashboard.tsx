import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Dashboard } from 'Components/Dashboard';

const DashboardContainer = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

const DashboardContainerMemo = memo(DashboardContainer, areEqual);

export { DashboardContainerMemo as DashboardContainer };
