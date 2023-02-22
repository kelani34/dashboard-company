import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { NavLink } from 'react-router-dom';
import { Icon } from 'Components/Icons';
import { CompanyHeader } from 'Components/CompanyHeader';
import { SideBarNav } from './SideBarNav';

import classes from './sideBar.module.css';

type NavItemsType = {
  id: number;
  title: string;
  path: string;
  icon: string;
};

interface Props {
  sideBarDesktop: boolean;
  sideBarMobile: boolean;
  companyName?: string;
  toggleSideBar: () => void;
  navItems: Array<NavItemsType>;
  pathname: string;
}

const SideBar = ({ sideBarDesktop, sideBarMobile, companyName, toggleSideBar, navItems, pathname }: Props) => (
  <div
    className={`d-flex flex-column ${sideBarDesktop ? classes?.sideBarClosed : ''} ${
      sideBarMobile ? classes.sideBarMobile : ''
    }`}
  >
    <div className={`${classes.sideBar}`}>
      <Icon type="sideBarClose" className={classes.sideBarCloseIcon} onClick={toggleSideBar} />
      <div className="d-flex flex-column w-100">
        <div className="d-flex flex-column w-100">
          <div className={`${classes.sideBarHeader} ${classes?.sideBarInner}`}>
            <NavLink
              to="/dashboard"
              className={`${sideBarDesktop ? classes.logoIcon : classes.largeLogo}`}
              aria-current="page"
            >
              {sideBarDesktop ? (
                <Icon className={classes.headerLogoIcon} type="logoIcon" />
              ) : (
                <span className={classes.headerLogo}>
                  <CompanyHeader iconClassName="logo" />
                </span>
              )}
            </NavLink>
            <div className={classes.hr} />
          </div>
          <div className={`${classes.companyNameContainer}`}>
            {sideBarDesktop ? (
              <Icon type="threeDots" />
            ) : (
              <>
                <p className="mb-0">{companyName}</p>{' '}
              </>
            )}
          </div>
          <SideBarNav navItems={navItems} minimized={sideBarDesktop} pathname={pathname} />
        </div>
      </div>
    </div>
    <div className={`${classes.iconContainer}`}>
      <Icon
        className={`${classes.sideBarArrow}`}
        type={sideBarDesktop ? 'sideBarRightArrow' : 'sideBarLeftArrow'}
        onClick={toggleSideBar}
      />
    </div>
  </div>
);

SideBar.defaultProps = {
  companyName: undefined,
};

const SideBarMemo = memo(SideBar, areEqual);

export { SideBarMemo as SideBar };
