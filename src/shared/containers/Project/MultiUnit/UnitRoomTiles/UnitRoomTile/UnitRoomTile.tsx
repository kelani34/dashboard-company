import React, { memo, useEffect, useState } from "react";
import { areEqual } from "Utils/equalityChecks";
import classes from "Containers/Project/MultiUnit/MultiUnit/multiUnit.module.css";
import { RoomTiles } from "Containers/Project/MultiUnit/RoomTiles";
import { useDispatch, useSelector } from "react-redux";
import { unitRoomsWithPhotosSelector } from "Containers/Project/Unit/Rooms/selectors";
import { setUnitRoomsWithPhotos } from "Containers/Project/Unit/actions";

interface Props {
  id: number;
  name: string;
}

const UnitRoomTileContainer = ({ id, name }: Props) => {
  const dispatch = useDispatch();

  const unitRooms = useSelector(unitRoomsWithPhotosSelector, areEqual);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (unitRooms.length > 0) {
      const unitRoom = unitRooms.find((unitRoom: any) => unitRoom.unitId === id);

      if (unitRoom?.rooms?.length > 0) {
        setRooms(unitRoom.rooms);
      } else {
        setRooms([]);
      }
    } else {
      setRooms([]);
    }
  }, [unitRooms]);

  useEffect(() => {
    dispatch(setUnitRoomsWithPhotos(id));
  }, [id]);

  return (
    rooms.length > 0 && (
      <div>
        <h6 className={classes.unitText}>{name}</h6>
        <div className={classes.tilesContainer}>
          <RoomTiles
            data={{
              id,
              name,
            }}
            type="unit"
            rooms={rooms}
          />
        </div>
      </div>
    )
  );
};

const UnitRoomTileContainerMemo = memo(UnitRoomTileContainer, areEqual);

export { UnitRoomTileContainerMemo as UnitRoomTile };
