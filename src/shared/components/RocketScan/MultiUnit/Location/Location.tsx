import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { RoomTiles } from 'Containers/RocketScan';
import { MultiUnitLocationHeader } from 'Containers/RocketScan/MultiUnit';

import classes from './location.module.css';

interface Props {
  location: any;
  isOnScreen: boolean;
  roomsData: any;
  onClickLocationName: (e: any) => void;
  setRoomsData: (e: any) => void;
}

const Location = React.forwardRef(
  ({ location, isOnScreen, roomsData, onClickLocationName, setRoomsData }: Props, locationRef: any) => (
    <div
      className={classes.locationBase}
      ref={(ref) => {
        locationRef.current = ref;
      }}
    >
      <MultiUnitLocationHeader location={location} onClickLocationName={onClickLocationName} />

      <div className={classes.locationRoomTiles}>
        <RoomTiles location={location} isOnScreen={isOnScreen} roomsData={roomsData} setRoomsData={setRoomsData} />
      </div>
    </div>
  )
);

const LocationMemo = memo(Location, areEqual);

export { LocationMemo as Location };
