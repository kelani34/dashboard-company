import { RoomButton } from 'Containers/RoomButton';
import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { RoomLevel } from 'Components/Rooms/RoomLevel';

interface Props {
  groupedRooms: any;
  noLevelRooms: any;
  selectedRoomId?: number;
  onClickRoomButton: (e: any) => void;
}

const RoomButtons = ({ groupedRooms, noLevelRooms, selectedRoomId, onClickRoomButton }: Props) => (
  <>
    {noLevelRooms.map(({ id, room_type: roomType }: any) => (
      <span key={`room-button-${id}`} className="w-100">
        <RoomButton id={id} iconType={roomType.name} isActive={selectedRoomId === id} onClick={onClickRoomButton}>
          {roomType?.name}
        </RoomButton>
      </span>
    ))}
    {groupedRooms.map((level) => (
      <RoomLevel key={`level-${level.id}`} name={level.name}>
        {level.rooms.map(({ id, room_type: roomType }: any) => (
          <span key={`room-button-${id}`} className="w-100">
            <RoomButton id={id} iconType={roomType.name} isActive={selectedRoomId === id} onClick={onClickRoomButton}>
              {roomType?.name}
            </RoomButton>
          </span>
        ))}
      </RoomLevel>
    ))}
  </>
);

RoomButtons.defaultProps = {
  selectedRoomId: undefined,
};

const RoomButtonsMemo = memo(RoomButtons, areEqual);

export { RoomButtonsMemo as RoomButtons };
