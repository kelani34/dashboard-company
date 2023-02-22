import React, { memo, ReactNode } from 'react';
import { Icon } from 'Components/Icons';
import { Toast } from 'Components/Toast';
import { Anchor } from 'Components/Anchor';

import { areEqual } from 'Utils/equalityChecks';

import classes from './guestLayout.module.css';

interface Props {
  children: ReactNode;
}

const GuestLayout = ({ children }: Props) => (
  // This will contain the basic css used to display the Company Authentication UIs
  <div className={`container-fluid ${classes.noPadding}`}>
    <div className={`row ${classes['row-override']}`}>
      <div className={`col-4 d-none d-sm-none d-md-block ${classes.noPadding}`}>
        <div className={`${classes.leftContainer}`}>
          <div className={`${classes.leftContainerCopy}`}>
            <Anchor href="https://www.company.com/">
              <Icon className={`${classes.logoDesktop}`} type="logo" />
            </Anchor>
            <h2 className={`${classes.title}`}>Ready, set and blast off!</h2>
            <p className={`${classes.lede}`}>Welcome to Company.</p>
          </div>
        </div>
      </div>
      <div className={`col col-md-8 ${classes.noPadding}`}>
        <Toast />
        <div className={`${classes.rightContainer}`}>{children}</div>
      </div>
    </div>
  </div>
);

const GuestLayoutMemo = memo(GuestLayout, areEqual);

export { GuestLayoutMemo as GuestLayout };
