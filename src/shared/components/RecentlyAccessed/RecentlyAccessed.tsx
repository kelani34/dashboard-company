import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import { areEqual } from "Utils/equalityChecks";

import { Icon } from "Components/Icons";

import classes from "./recentlyAccessed.module.css";

type AddressType = {
  id: number;
  name: string;
  path: string;
};

interface Props {
  minimized: boolean;
  addresses: Array<AddressType>;
}

const RecentlyAccessed = ({ minimized, addresses }: Props) => (
  <div className={`${classes.recentlyAccessedBase} ${minimized ? classes?.closed : ""}`}>
    <div className={`${classes.titleContainer} ${!minimized ? classes.leftAligned : ""}`}>
      {minimized ? (
        <span title="Recently Accessed" className={classes.titleIcon}>
          <Icon type="threeDots" />
        </span>
      ) : (
        <h4 className={`${classes.h4}`}>Recently Accessed</h4>
      )}
    </div>
    <ul className="nav flex-column mb-auto">
      {addresses.map((address: any) => (
        <li className={`nav-item d-flex w-100 ${classes.navItem}`} key={address.id}>
          <NavLink
            to={address.path}
            className={`nav-link w-100 d-flex align-items-center ${classes.navLink}`}
            aria-current="page"
          >
            <span title={address.name}>
              <Icon className={`${classes.navIcon}`} type="addressBuilding" />
            </span>
            {!minimized && <span className={`${classes.navTitle}`}>{address.name}</span>}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

const RecentlyAccessedMemo = memo(RecentlyAccessed, areEqual);

export { RecentlyAccessedMemo as RecentlyAccessed };
