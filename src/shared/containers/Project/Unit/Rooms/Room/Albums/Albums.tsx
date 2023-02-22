import React, { memo, useCallback, useEffect } from "react";
import { areEqual } from "Utils/equalityChecks";

import { Albums } from "Components/Project/Unit/Rooms/Room/Albums/Albums";
import { useDispatch, useSelector } from "react-redux";
import { listAlbums, setSelectedUnitRooms } from "Containers/Project/Unit/Rooms/actions";
import { albumsSelector, unitRoomsWithPhotosSelector } from "Containers/Project/Unit/Rooms/selectors";
import { PhotosPlaceholder } from "Containers/PhotosPlaceholder";
import { useHistory } from "react-router-dom";
import { ADD_LOCATIONS, MULTI_UNIT, PHOTO_MANAGEMENT, SINGLE } from "Utils/constants";
import { selectedMultiUnitSelector } from "Containers/Project/Unit/selector";
import { floorRoomsWithPhotosSelector } from "Containers/Project/Floor/selectors";

interface Props {
  roomId: string;
  roomName: string;
  photosCount: number;
}

const AlbumsContainer = ({ roomId, roomName, photosCount }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const albums: any[] = useSelector(albumsSelector, areEqual);

  const selectedMultiUnit: any = useSelector(selectedMultiUnitSelector, areEqual);
  const unitRooms = useSelector(unitRoomsWithPhotosSelector, areEqual);
  const floorRooms = useSelector(floorRoomsWithPhotosSelector, areEqual);

  useEffect(() => {
    if (albums.length === 0) {
      dispatch(listAlbums());
    }
  }, [albums]);

  // this will set existing rooms for photo upload page
  useEffect(() => {
    if (unitRooms.length > 0 && selectedMultiUnit?.type === "unit") {
      const unitRoom = unitRooms.find((unitRoom: any) => unitRoom.unitId === selectedMultiUnit.id);

      if (unitRoom?.rooms.length > 0) {
        dispatch(setSelectedUnitRooms([]));
        dispatch(setSelectedUnitRooms(unitRoom.rooms));
      } else {
        dispatch(setSelectedUnitRooms([]));
      }
    } else if (floorRooms.length > 0 && selectedMultiUnit?.type === "floor") {
      const floorRoom = floorRooms.find((floorRoom: any) => floorRoom.floorId === selectedMultiUnit.id);

      if (floorRoom?.rooms.length > 0) {
        dispatch(setSelectedUnitRooms([]));
        dispatch(setSelectedUnitRooms(floorRoom.rooms));
      } else {
        dispatch(setSelectedUnitRooms([]));
      }
    } else {
      dispatch(setSelectedUnitRooms([]));
    }
  }, [unitRooms, selectedMultiUnit]);

  const onButtonClick = useCallback(() => {
    if (selectedMultiUnit?.id) {
      history.push(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}${MULTI_UNIT}/add`);
    } else {
      history.push(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}${SINGLE}`);
    }
  }, [selectedMultiUnit]);

  return photosCount > 0 ? (
    <Albums roomId={roomId} albums={albums} />
  ) : (
    <PhotosPlaceholder roomName={roomName} onButtonClick={onButtonClick} />
  );
};

const AlbumsContainerMemo = memo(AlbumsContainer, areEqual);

export { AlbumsContainerMemo as AlbumsContainer };
