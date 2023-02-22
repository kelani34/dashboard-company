import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';

import { PurpleButton } from 'Components/Button';
import classes from './nav.module.css';

interface Props {
  userAvatar: any;
  firstName: string;
  toggleSideBar: (e: any) => void;
  toAccountOnClick: (e: any) => void;
}

const Nav = ({ userAvatar, firstName, toggleSideBar, toAccountOnClick }: Props) => (
  <div className={classes.container}>
    <div className={classes.left}>
      <Icon className={classes.hamburgerMenu} type="hamburgerMenu" onClick={toggleSideBar} />
    </div>
    <div className={classes.right}>
      <div className={classes.buttonContainer}>
        {/* <PurpleButton className={classes.createProjectButton} onClick={createProjectAction}>
          Create Project <Icon type="plus" />
        </PurpleButton> */}
      </div>

      <div className={classes.supportIconContainer}>
        <a href="#" id="intercomSupport">
          <Icon type="support" />
        </a>
      </div>

      <div className={classes.welcomeContainer}>
        <a className={classes.welcome} href="#" onClick={toAccountOnClick}>
          {' '}
          {/* href="#" onClick={logOutClick} */}
          Hi, <strong>{firstName}</strong>
        </a>
      </div>
      <div>
        <span
          className={classes.accountBox}
          onClick={toAccountOnClick}
          onKeyUp={toAccountOnClick}
          role="button"
          tabIndex={-1}
        >
          {userAvatar}
        </span>
      </div>
    </div>
  </div>
);

const NavMemo = memo(Nav, areEqual);
export { NavMemo as Nav };
