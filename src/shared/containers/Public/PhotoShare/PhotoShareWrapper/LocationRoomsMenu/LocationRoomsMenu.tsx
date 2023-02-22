import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { RoomSelector } from '../RoomSelector';

interface Props {
  item: any;
  subItems: any;
  classNameMenu: string;
  classNameMessage: string;
  onRoomClick: (e: any) => void;
}

const LocationRoomsMenu = ({ item, subItems, classNameMenu, classNameMessage, onRoomClick }: Props) => (
  <>
    {subItems?.length > 0 ? (
      subItems.map(({ id, room_type: roomType }) => (
        <RoomSelector
          key={id}
          id={id}
          roomType={roomType}
          className={classNameMenu}
          location={item}
          onRoomClick={onRoomClick}
        />
      ))
    ) : (
      <p className={classNameMessage}>Location has no rooms added</p>
    )}
  </>
);

const LocationRoomsMenuMemo = memo(LocationRoomsMenu, areEqual);

export { LocationRoomsMenuMemo as LocationRoomsMenu };
