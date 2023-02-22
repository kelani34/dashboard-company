import React, { memo, useCallback } from "react";
import { areEqual } from "Utils/equalityChecks";

import { RoomTile } from "Components/Rooms/RoomTile";

interface Props {
  id: number;
  roomName: string;
  photosCount: number;
  thumbnailSrcUrl?: string;
  onClickRoom?: (e: any) => void;
}

const RoomTileContainer = ({ id, roomName, photosCount, thumbnailSrcUrl, onClickRoom }: Props) => {
  const onClick = useCallback(() => {
    if (onClickRoom) onClickRoom(id);
  }, []);

  return <RoomTile roomName={roomName} photosCount={photosCount} thumbnailSrcUrl={thumbnailSrcUrl} onClick={onClick} />;
};

RoomTileContainer.defaultProps = {
  thumbnailSrcUrl: undefined,
  onClickRoom: undefined,
};

const RoomTileContainerMemo = memo(RoomTileContainer, areEqual);

export { RoomTileContainerMemo as RoomTile };
