import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Room } from 'Components/Public';

interface Props {
  roomId: string;
  roomName: string;
  photosCount: number;
  roomType: boolean;
}

const RoomContainer = ({ roomId, roomName, photosCount, roomType }: Props) => (
  <Room roomId={roomId} roomName={roomName} roomType={roomType} photosCount={photosCount} />
);

const RoomContainerMemo = memo(RoomContainer, areEqual);

export { RoomContainerMemo as Room };
