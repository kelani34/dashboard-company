import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { Location } from 'Components/Public';
import { photoShareUnitRoomsSelector, uuidSelector } from '../PhotoShare/selectors';

import { getPhotoShareUnitRooms } from '../PhotoShare/actions';

interface Props {
  locationName: string;
  locationId: string;
}

const LocationContainer = ({ locationName, locationId }: Props) => {
  const dispatch = useDispatch();

  const uuid = useSelector(uuidSelector, areEqual);
  const locationRoomsWithPhotos = useSelector(photoShareUnitRoomsSelector, areEqual);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (uuid) {
      dispatch(getPhotoShareUnitRooms(uuid, locationId));
    }
  }, [uuid]);

  useEffect(() => {
    if (locationRoomsWithPhotos.length > 0) {
      const locationRoom = locationRoomsWithPhotos.find((locationRoom: any) => locationRoom.unitId === locationId);

      if (locationRoom?.rooms?.length > 0) {
        setRooms(locationRoom.rooms);
      } else {
        setRooms([]);
      }
    } else {
      setRooms([]);
    }
  }, [locationRoomsWithPhotos]);

  return <Location unitName={locationName} rooms={rooms} />;
};

const LocationContainerMemo = memo(LocationContainer, areEqual);

export { LocationContainerMemo as Location };
