import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { CompanyHeader } from 'Components/CompanyHeader';

import { SideBarMenu } from 'Containers/Public/PhotoShare/PhotoShareWrapper/SideBarMenu';
import classes from './sideBarFixed.module.css';

interface Props {
  companyName?: string;
}

const SideBarFixed = ({ companyName = 'Restoration 1 Toronto' }: Props) => (
  <div className={`d-none d-md-flex flex-column ${classes.sideBar}`}>
    <div className={classes.sideBarWrapper}>
      <div className={`${classes.sideBarHeader} ${classes?.sideBarInner}`}>
        <span className={classes.headerLogo}>
          <CompanyHeader iconClassName="logo" />
        </span>

        <div className={classes.hr} />
      </div>

      <p className={`mb-0 ${classes.company}`}>{companyName}</p>
    </div>

    <SideBarMenu />
  </div>
);

SideBarFixed.defaultProps = {
  companyName: undefined,
};

const SideBarFixedMemo = memo(SideBarFixed, areEqual);

export { SideBarFixedMemo as SideBarFixed };
