import React, { memo, useEffect } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchingLocationRoomsSelector,
  generalLevelsSelector,
  roomCreatedSelector,
  roomDeletedSelector,
  roomLevelUpdatedSelector,
  roomsSelector,
} from 'Containers/RocketScan/RoomsView/Rooms/selectors';
import { RoomContent } from 'Containers/RocketScan';
import { Spinner } from 'Components/Spinner';
import { listLocationRooms } from 'Containers/RocketScan/RoomsView/Rooms/actions';
import { roomSourceStatusUpdatedSelector } from 'Containers/ProjectData/LossData/selectors';

import { EmptyRoomsPlaceholder } from 'Components/RocketScan';
import { setSelectedRooms } from 'Containers/RocketScan/Header/ActionsCenter/actions';
import { RoomProvider } from 'Context/RocketScan';
import classes from './rooms.module.css';

interface Props {
  locationId: number;
}

const RoomsContainer = ({ locationId }: Props) => {
  const dispatch = useDispatch();

  // selectors
  const rooms = useSelector(roomsSelector, areEqual);
  const roomLevelUpdated = useSelector(roomLevelUpdatedSelector, areEqual);
  const roomCreated = useSelector(roomCreatedSelector, areEqual);
  const roomDeleted = useSelector(roomDeletedSelector, areEqual);
  const levels = useSelector(generalLevelsSelector, areEqual);
  const fetching = useSelector(fetchingLocationRoomsSelector, areEqual);
  const roomSourceStatusUpdated = useSelector(roomSourceStatusUpdatedSelector, areEqual);

  // initial api call
  useEffect(() => {
    if (locationId && levels.length > 0) {
      dispatch(listLocationRooms(locationId));
    }
  }, [locationId, levels]);

  useEffect(() => {
    if (rooms.length > 0) {
      rooms.forEach((room: any) => {
        const { id, photos, photos_count: photosCount } = room;

        dispatch(
          setSelectedRooms({
            id,
            photos,
            photosCount,
          })
        );
      });
    } else {
      dispatch(setSelectedRooms({}));
    }
  }, [rooms]);

  // refresh the API on room create, room delete or level update
  useEffect(() => {
    if (roomLevelUpdated || roomCreated || roomDeleted || roomSourceStatusUpdated) {
      dispatch(listLocationRooms(locationId));
    }
  }, [roomCreated, roomDeleted, roomLevelUpdated, roomSourceStatusUpdated]);

  return (
    <div className={classes.roomsBase}>
      {rooms.length > 0 &&
        rooms.map((room: any, index: number) => (
          <RoomProvider key={room.id}>
            <RoomContent room={room} isLastItem={index === rooms.length - 1} />
          </RoomProvider>
        ))}
      {!fetching && rooms.length === 0 && <EmptyRoomsPlaceholder />}
      {fetching && <Spinner loading />}
    </div>
  );
};

const RoomsContainerMemo = memo(RoomsContainer, areEqual);

export { RoomsContainerMemo as RoomsContainer };
