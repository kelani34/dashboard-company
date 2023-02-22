import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";
import { Room } from "Components/Project/Unit/Rooms/Room";

interface Props {
  id: string;
  name: string;
  roomType: string;
  photosCount: number;
  hide?: boolean;
}

const RoomContainer = ({ id, name, roomType, photosCount, hide }: Props) =>
  !hide && <Room id={id} name={name} roomType={roomType} photosCount={photosCount} />;

RoomContainer.defaultProps = {
  hide: false,
};

const RoomContainerMemo = memo(RoomContainer, areEqual);

export { RoomContainerMemo as RoomContainer };
