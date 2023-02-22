import React, { memo, useCallback, useEffect, useState } from "react";
import { areEqual } from "Utils/equalityChecks";

import { useDispatch, useSelector } from "react-redux";

import { UnitContent } from "Components/Project/Unit";

import {
  roomsSelector,
  selectedRoomIdSelector,
  singleUnitFetchingRoomsSelector,
  unitRoomsWithPhotosSelector,
} from "Containers/Project/Unit/Rooms/selectors";
import { setUnitRoomsWithPhotos } from "Containers/Project/Unit/actions";
import { LocationsPlaceholder } from "Containers/LocationsPlaceholder";
import { ADD_LOCATIONS, ALL_LOCATIONS, PHOTO_MANAGEMENT } from "Utils/constants";
import { useHistory, useLocation } from "react-router-dom";
import { setFloorRoomsWithPhotos } from "Containers/Project/Floor/actions";
import { floorRoomsWithPhotosSelector } from "Containers/Project/Floor/selectors";

interface Props {
  type?: string;
  id?: number;
}

const UnitContentContainer = ({ type, id }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { pathname } = location;

  const singleUnitRooms = useSelector(roomsSelector, areEqual);
  const units = useSelector(unitRoomsWithPhotosSelector, areEqual);
  const floors = useSelector(floorRoomsWithPhotosSelector, areEqual);
  const selectedRoomId = useSelector(selectedRoomIdSelector, areEqual);
  const fetching: boolean = useSelector(singleUnitFetchingRoomsSelector, areEqual);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (pathname.includes(`/projects${PHOTO_MANAGEMENT}${ALL_LOCATIONS}`)) {
      if (type === "single") {
        setRooms(singleUnitRooms);
      } else if (type === "unit") {
        if (units.length > 0) {
          const unit = units.find(({ unitId }: any) => unitId === id);

          if (unit?.rooms?.length > 0) {
            setRooms(unit.rooms);
          } else {
            setRooms([]);
          }
        }
      } else if (type === "floor") {
        if (floors.length > 0) {
          const floor = floors.find(({ floorId }: any) => floorId === id);

          if (floor?.rooms?.length > 0) {
            setRooms(floor.rooms);
          } else {
            setRooms([]);
          }
        }
      } else {
        setRooms([]);
      }
    }
  }, [type, id, units, floors, singleUnitRooms, pathname]);

  useEffect(() => {
    if (pathname.includes(`/projects${PHOTO_MANAGEMENT}${ALL_LOCATIONS}`)) {
      if (type === "unit") {
        dispatch(setUnitRoomsWithPhotos(id));
      } else if (type === "floor") {
        dispatch(setFloorRoomsWithPhotos(id));
      }
    }
  }, [id, pathname]);

  const onAddButtonClick = useCallback(() => {
    if (type === "single") {
      history.push(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}/single`);
    } else {
      history.push(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}/multiUnit`);
    }
  }, [type]);

  return rooms.length > 0 ? (
    <UnitContent rooms={rooms} selectedRoomId={selectedRoomId} fetching={fetching} />
  ) : (
    <LocationsPlaceholder
      heading="No locations yet. Add a new location, or start adding photos."
      onTabClick={onAddButtonClick}
    />
  );
};

UnitContentContainer.defaultProps = {
  type: "single",
  id: undefined,
};

const UnitContentContainerMemo = memo(UnitContentContainer, areEqual);

export { UnitContentContainerMemo as UnitContentContainer };
