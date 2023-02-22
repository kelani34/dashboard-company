import React, { memo, useCallback } from "react";
import { areEqual } from "Utils/equalityChecks";

import { RoomTile } from "Containers/Project/MultiUnit";
import { setSelectedMultiUnit } from "Containers/Project/Unit/actions";
import { useDispatch } from "react-redux";
import { setSelectedRoomId } from "Containers/Project/Unit/Rooms/actions";
import { ALL_LOCATIONS, PHOTO_MANAGEMENT } from "Utils/constants";
import { useHistory } from "react-router-dom";

interface Props {
  rooms: any;
  data?: any;
  type?: string;
}

const RoomTilesContainer = ({ rooms, data, type }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const thumbnailSelector = (thumbnail: any) => {
    if (thumbnail) {
      const { sizes } = thumbnail;

      return sizes.large;
    }

    return "";
  };

  const onClickRoom = useCallback((roomId: number) => {
    const { id, name } = data;

    dispatch(
      setSelectedMultiUnit({
        id,
        name,
        type,
      })
    );

    dispatch(setSelectedRoomId(roomId));

    history.push(`/projects${PHOTO_MANAGEMENT}${ALL_LOCATIONS}/multiUnitView`);
  }, []);

  return (
    rooms.length > 0 &&
    rooms.map(({ id, room_type: roomType, photos_count: photosCount, thumbnail }: any) => (
      <RoomTile
        key={id}
        id={id}
        roomName={roomType.name}
        photosCount={photosCount}
        thumbnailSrcUrl={thumbnailSelector(thumbnail)}
        onClickRoom={onClickRoom}
      />
    ))
  );
};

RoomTilesContainer.defaultProps = {
  data: undefined,
  type: undefined,
};

const RoomTilesContainerMemo = memo(RoomTilesContainer, areEqual);

export { RoomTilesContainerMemo as RoomTiles };
