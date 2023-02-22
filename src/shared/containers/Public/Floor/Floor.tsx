import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { areEqual } from 'Utils/equalityChecks';

import { Location } from 'Components/Public';
import { photoShareFloorRoomsSelector } from '../PhotoShare/selectors';

import { getPhotoShareFloorRooms } from '../PhotoShare/actions';

interface Props {
  floorName: string;
  floorId: string;
}

const FloorContainer = ({ floorName, floorId }: Props) => {
  const dispatch = useDispatch();

  const { uuid } = useParams<{ uuid: string }>();

  const floorRoomsWithPhotos = useSelector(photoShareFloorRoomsSelector, areEqual);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    dispatch(getPhotoShareFloorRooms(uuid, floorId));
  }, [floorId]);

  useEffect(() => {
    if (floorRoomsWithPhotos.length > 0) {
      const floorRoom = floorRoomsWithPhotos.find((floorRoom: any) => floorRoom.floorId === floorId);

      if (floorRoom?.rooms?.length > 0) {
        setRooms(floorRoom.rooms);
      } else {
        setRooms([]);
      }
    } else {
      setRooms([]);
    }
  }, [floorRoomsWithPhotos]);

  return <Location unitName={floorName} rooms={rooms} />;
};

const FloorContainerMemo = memo(FloorContainer, areEqual);

export { FloorContainerMemo as Floor };
