import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { Albums } from 'Containers/Project/Unit/Rooms/Room/Albums';
import classes from './room.module.css';

interface Props {
  id: string;
  name: string;
  roomType: string;
  photosCount: number;
}

// temporary user feedback during development
// const temporaryButtonAction = () => alert("Temporarily disabled for development");

const Room = ({ id, name, roomType, photosCount }: Props) => (
  <div className={`container-fluid ${classes.roomBase}`}>
    <div className="roomHeader d-flex justify-content-between align-items-center">
      <div className="col d-flex flex-row justify-content-start align-items-center">
        <div className={classes.imageWrapper}>
          <Icon type={roomType} />
        </div>
        <h2 className={classes.roomName}>{name}</h2>
      </div>
      {/* <Icon type="actionsdefault" onClick={temporaryButtonAction} /> */}
    </div>
    <div className={classes.albumsBase}>
      <Albums roomId={id} roomName={name} photosCount={photosCount} />
    </div>
  </div>
);

const RoomMemo = memo(Room, areEqual);

export { RoomMemo as Room };
