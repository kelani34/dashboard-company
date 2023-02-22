import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

interface Props {}

const Dashboard = ({}: Props) => (
  <div id="Dashboard" className="container-fluid">
    <div className="row">
      <div className="col-md-7 col-xl-8 col-xxl-9"></div>
      <div className="col-md-5 col-xl-4 col-xxl-3"></div>
    </div>
  </div>
);

const DashboardMemo = memo(Dashboard, areEqual);

export { DashboardMemo as Dashboard };
