import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Button } from 'Components/Button';

interface Props {
  id: number;
  className: string;
  roomType: any;
  location: any;
  onRoomClick: (e: any) => void;
}

const RoomSelectorContainer = ({ id, className, roomType, location, onRoomClick }: Props) => {
  const onClick = useCallback(() => {
    if (onRoomClick) onRoomClick({ location, id });
  }, []);

  return (
    <Button className={className} id={`${id}-${roomType.id}`} key={`${id}-${roomType.id}`} onClick={onClick}>
      {roomType.name}
    </Button>
  );
};

const RoomSelectorContainerMemo = memo(RoomSelectorContainer, areEqual);

export { RoomSelectorContainerMemo as RoomSelector };
