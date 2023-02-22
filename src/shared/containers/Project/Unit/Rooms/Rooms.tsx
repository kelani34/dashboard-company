import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";
import { Room } from "Containers/Project/Unit/Rooms/Room";

interface Props {
  rooms: any;
  selectedRoomId?: string;
}

const RoomsContainer = ({ rooms, selectedRoomId }: Props) =>
  rooms.map((room: any) => (
    <Room
      key={`room-content-${room.id}`}
      id={room.id.toString()}
      name={room.room_type.name}
      roomType={room.room_type.name}
      photosCount={room.photos_count}
      hide={selectedRoomId && selectedRoomId !== room.id}
    />
  ));

RoomsContainer.defaultProps = {
  selectedRoomId: null,
};

const RoomsContainerMemo = memo(RoomsContainer, areEqual);

export { RoomsContainerMemo as RoomsContainer };
