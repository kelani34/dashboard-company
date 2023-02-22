import React, { memo, ReactNode, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { areEqual } from 'Utils/equalityChecks';
import { width } from 'Utils/screen';

import { DashboardLayout } from 'Components/Layouts';
import { IntercomProvider } from 'react-use-intercom';
import { MobileWarningModal } from 'Containers/MobileWarningModal';
import { HubSpotModal } from 'Containers/HubSpotModal';

interface Props {
  children: ReactNode;
  isFirstTimer?: boolean;
}

const INTERCOM_ID: string = process.env.REACT_INTERCOM_ID;

const DashboardWrapperContainer = ({ children, isFirstTimer }: Props) => {
  const location = useLocation();
  const { pathname } = location;

  // this is to slide the sidebar on desktop view
  const [sideBarDesktop, setSideBarDesktop] = useState(false);

  // this is to slide the sidebar on mobile view
  const [sideBarMobile, setSideBarMobile] = useState(false);

  const toggleSideBar = useCallback(() => {
    if (width <= 991) {
      setSideBarMobile((prev) => !prev);
    } else {
      setSideBarDesktop((prev) => !prev);
    }
  }, []);

  // reset the sidebar menu on route change
  useEffect(() => {
    setSideBarMobile(false);
  }, [pathname]);

  // dashboard wrapper is wrapped with intercom provider, so we can access its' features
  return (
    <IntercomProvider appId={INTERCOM_ID}>
      <DashboardLayout
        toggleSideBar={toggleSideBar}
        sideBarMobile={sideBarMobile}
        sideBarDesktop={sideBarDesktop}
        pathname={pathname}
      >
        {children}
        <HubSpotModal visible={isFirstTimer} />
        <MobileWarningModal />
      </DashboardLayout>
    </IntercomProvider>
  );
};

DashboardWrapperContainer.defaultProps = {
  isFirstTimer: false,
};

const DashboardWrapperContainerMemo = memo(DashboardWrapperContainer, areEqual);

export { DashboardWrapperContainerMemo as DashboardWrapperContainer };
