import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { Avatar } from 'Components/Avatar';
// import { Albums } from "Containers/Project/Unit/Rooms/Room/Albums";
import classes from './header.module.css';

interface Props {
  id: string;
  logo?: string;
  location: string;
  date: string;
}

const Header = ({ id, logo, location, date }: Props) => (
  <div className="container-fluid w-100 p-0">
    <div className={`d-flex justify-content-between align-items-stretch ${classes.header}`}>
      <div className={`d-flex justify-content-start align-items-center ${classes.headerLeft}`}>
        <div className={classes.imageWrapper}>
          {logo ? <Avatar className={classes.logo} avatar={logo} /> : <Icon className={classes.icon} type="highrise" />}
        </div>
        <div className={classes.location}>
          <h2 className={classes.address}>{location}</h2>
          <span className={classes.locationId}>{id}</span>
        </div>
      </div>
      <div className={`d-none d-md-block ${classes.headerRight}`}>
        <span>{date}</span>
      </div>
    </div>
  </div>
);

Header.defaultProps = {
  logo: undefined,
};

const HeaderMemo = memo(Header, areEqual);

export { HeaderMemo as Header };
