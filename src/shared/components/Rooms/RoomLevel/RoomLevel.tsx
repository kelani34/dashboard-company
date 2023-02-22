import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './roomLevel.module.css';

interface Props {
  name: string;
  children: any;
}

const RoomLevel = ({ name, children }: Props) => (
  <>
    <div className={classes.roomLevelBase}>
      <h6 className={classes.levelName}>
        <span>{name}</span>
      </h6>
    </div>
    {children}
  </>
);

const RoomLevelMemo = memo(RoomLevel, areEqual);

export { RoomLevelMemo as RoomLevel };
