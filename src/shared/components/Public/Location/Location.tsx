import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Room } from 'Containers/Public';

import classes from './location.module.css';

interface Props {
  unitName: string;
  rooms: any[];
}

const Location = ({ unitName, rooms }: Props) => (
  <div className="container-fluid flex-row justify-content-start align-items-center px-0">
    <div className={classes.unitText}>{unitName}</div>
    <div className={classes.roomWrapper}>
      {rooms.length > 0 &&
        rooms.map((room) => (
          <Room
            key={room.id}
            roomId={room.id}
            roomName={room.room_type.name}
            roomType={room.room_type.is_standard}
            photosCount={room.photos_count}
          />
        ))}
    </div>
  </div>
);

const LocationMemo = memo(Location, areEqual);

export { LocationMemo as Location };
