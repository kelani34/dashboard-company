import React, { memo, useEffect, useState } from "react";
import { areEqual } from "Utils/equalityChecks";
import classes from "Containers/Project/MultiUnit/MultiUnit/multiUnit.module.css";
import { RoomTiles } from "Containers/Project/MultiUnit/RoomTiles";
import { useDispatch, useSelector } from "react-redux";
import { floorRoomsWithPhotosSelector } from "Containers/Project/Floor/selectors";
import { setFloorRoomsWithPhotos } from "Containers/Project/Floor/actions";

interface Props {
  id: number;
  name: string;
}

const FloorRoomTileContainer = ({ id, name }: Props) => {
  const dispatch = useDispatch();

  const floorRooms = useSelector(floorRoomsWithPhotosSelector, areEqual);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    dispatch(setFloorRoomsWithPhotos(id));
  }, []);

  useEffect(() => {
    if (floorRooms.length > 0) {
      const floorRoom = floorRooms.find((floorRoom: any) => floorRoom.floorId === id);

      if (floorRoom?.rooms?.length > 0) {
        setRooms(floorRoom.rooms);
      } else {
        setRooms([]);
      }
    } else {
      setRooms([]);
    }
  }, [floorRooms]);

  return (
    rooms.length > 0 && (
      <div key={`${id}-floor`}>
        <h6 className={classes.unitText}>{name}</h6>
        <div className={classes.tilesContainer}>
          <RoomTiles data={{ id, name }} rooms={rooms} type="floor" />
        </div>
      </div>
    )
  );
};

const FloorRoomTileContainerMemo = memo(FloorRoomTileContainer, areEqual);

export { FloorRoomTileContainerMemo as FloorRoomTile };
