import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';

import classes from './sideBarNavItem.module.css';

interface Props {
  id: number;
  title: string;
  path: string;
  icon: string;
  pathname: string;
  minimized?: boolean;
}

const isActive = (pathname: string, path: string) => pathname.includes(path);

const SideBarNavItem = ({ id, title, path, icon, pathname, minimized }: Props) => (
  <li className={`nav-item ${classes.navItem} ${minimized ? classes?.closed : ''}`} key={id}>
    <NavLink
      to={path}
      className={`nav-link d-flex align-items-center ${classes.navLink} ${
        isActive(pathname, path) ? classes?.active : ''
      }`}
      aria-current="page"
      title={title}
    >
      <Icon className={`${classes.navIcon}`} type={icon} />
      <span className={`${classes.navTitle} ${minimized ? 'd-none' : ''}`}>{title}</span>
    </NavLink>
  </li>
);

SideBarNavItem.defaultProps = {
  minimized: false,
};

const SideBarNavItemMemo = memo(SideBarNavItem, areEqual);

export { SideBarNavItemMemo as SideBarNavItem };
