import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';
import classes from './rocketDryRoomHeader.module.css';

interface Props {
  icon: string;
  title: string;
}

const RocketDryRoomHeader = ({ icon, title }: Props) => (
  <div className={`${classes.rocketDryRoomHeader}`}>
    <div className={`d-flex justify-content-start align-items-center ${classes.titleArea}`}>
      <Icon type={icon} />
      <div className={classes.title}>{title}</div>
    </div>
  </div>
);

const RocketDryRoomHeaderMemo = memo(RocketDryRoomHeader, areEqual);

export { RocketDryRoomHeaderMemo as RocketDryRoomHeader };
