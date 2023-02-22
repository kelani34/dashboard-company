import React, { memo, useCallback } from "react";
import { areEqual } from "Utils/equalityChecks";
import { Button } from "Components/Button";

interface Props {
  id: number;
  className: string;
  roomType: any;
  unit: any;
  onRoomClick: (e: any) => void;
}

const UnitSelectorRoomContainer = ({ id, className, roomType, unit, onRoomClick }: Props) => {
  const onClick = useCallback(() => {
    if (onRoomClick) onRoomClick({ unit, id });
  }, []);

  return (
    <Button className={className} id={`${id}-${roomType.id}`} key={`${id}-${roomType.id}`} onClick={onClick}>
      {roomType.name}
    </Button>
  );
};

const UnitSelectorRoomContainerMemo = memo(UnitSelectorRoomContainer, areEqual);

export { UnitSelectorRoomContainerMemo as UnitSelectorRoom };
