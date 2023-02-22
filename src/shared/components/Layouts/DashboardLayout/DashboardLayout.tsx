import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { SideBar } from 'Containers/Dashboard';
import { Nav } from 'Containers/Nav';
import { Mask } from 'Components/Mask';

import classes from './dashboardLayout.module.css';

interface Props {
  children: ReactNode;
  sideBarDesktop: boolean;
  sideBarMobile: boolean;
  toggleSideBar: () => void;
  pathname: string;
}

const DashboardLayout = ({ children, sideBarDesktop, sideBarMobile, toggleSideBar, pathname }: Props) => (
  <div className={`d-flex flex-row w-100 ${classes.dashboardBase} ${sideBarDesktop ? classes?.sideBarClosed : ''}`}>
    <div>
      <SideBar
        toggleSideBar={toggleSideBar}
        sideBarDesktop={sideBarDesktop}
        sideBarMobile={sideBarMobile}
        pathname={pathname}
      />
    </div>
    <div className={`${classes.mainContent}`}>
      <div className={`${classes.navBar}`}>
        <Nav toggleSideBar={toggleSideBar} />
      </div>
      {sideBarMobile && <Mask toggleSideBar={toggleSideBar} />}
      <div className={`${classes.content}`}>{children}</div>
    </div>
  </div>
);

const DashboardLayoutMemo = memo(DashboardLayout, areEqual);

export { DashboardLayoutMemo as DashboardLayout };
