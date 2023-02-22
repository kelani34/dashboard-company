import React, { memo } from 'react';
import { RoomIcon } from 'Components/Icons';

import { Albums } from 'Containers/Public';

import { areEqual } from 'Utils/equalityChecks';

import classes from './room.module.css';

interface Props {
  roomId: string;
  roomName: string;
  photosCount: number;
  roomType: boolean;
}

const Room = ({ roomId, roomName, photosCount, roomType }: Props) => (
  <>
    <div className={`d-flex flex-row justify-content-between align-items-center ${classes.roomContainer}`}>
      <div className="d-flex flex-row justify-content-start align-items-center px-0">
        <div className={classes.imageWrapper}>
          <RoomIcon type={roomType ? roomName : 'customroom'} />
        </div>
        <div className={classes.roomText}>{roomName}</div>
      </div>
      <div className={`d-none d-md-block ${classes.photosCountText}`}>{photosCount} Photos</div>
    </div>
    <Albums roomId={roomId} photosCount={photosCount} />
  </>
);

const RoomMemo = memo(Room, areEqual);

export { RoomMemo as Room };
