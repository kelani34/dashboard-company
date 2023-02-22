import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { SideBarNavItem } from 'Components/SideBar/SideBarNavItem';

type NavItems = {
  id: number;
  title: string;
  path: string;
  icon: string;
};

interface Props {
  navItems: Array<NavItems>;
  minimized?: boolean;
  pathname: string;
}

const SideBarNav = ({ navItems, minimized, pathname }: Props) => (
  <ul className="nav flex-column mb-auto">
    {navItems.map((navItem: NavItems) => (
      <SideBarNavItem
        key={navItem.id}
        id={navItem.id}
        title={navItem.title}
        path={navItem.path}
        icon={navItem.icon}
        pathname={pathname}
        minimized={minimized}
      />
    ))}
  </ul>
);

SideBarNav.defaultProps = {
  minimized: false,
};

const SideBarNavMemo = memo(SideBarNav, areEqual);

export { SideBarNavMemo as SideBarNav };
