import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRoomId } from 'Containers/Project/Unit/Rooms/actions';
import { selectedRoomIdSelector } from 'Containers/Project/Unit/Rooms/selectors';

import { RoomButtons } from 'Components/Project/Unit/Rooms/RoomButtons';

interface Props {
  rooms: any;
}

const RoomButtonsContainer = ({ rooms }: Props) => {
  const dispatch = useDispatch();

  const selectedRoomId = useSelector(selectedRoomIdSelector, areEqual);

  const [groupedRooms, setGroupedRooms] = useState([]);
  const [noLevelRooms, setNoLevelRooms] = useState([]);

  const onClickRoomButton = useCallback(
    (id: number) => {
      dispatch(setSelectedRoomId(id));
    },
    [selectedRoomId]
  );

  useEffect(
    () => () => {
      dispatch(setSelectedRoomId(undefined));
    },
    []
  );

  useEffect(() => {
    const groupedRooms = [];
    const noLevelRooms = [];
    rooms.forEach((room: any) => {
      const levelId = room.level?.id;

      if (levelId) {
        if (!groupedRooms[levelId]) {
          groupedRooms[levelId] = {
            id: levelId,
            name: room.level?.name,
            rooms: [],
          };
        }
        groupedRooms[levelId].rooms.push(room);
      } else {
        noLevelRooms.push(room);
      }
    });

    setGroupedRooms(groupedRooms);
    setNoLevelRooms(noLevelRooms);
  }, [rooms]);

  return (
    <RoomButtons
      groupedRooms={groupedRooms}
      noLevelRooms={noLevelRooms}
      selectedRoomId={selectedRoomId}
      onClickRoomButton={onClickRoomButton}
    />
  );
};

const RoomButtonsContainerMemo = memo(RoomButtonsContainer, areEqual);

export { RoomButtonsContainerMemo as RoomButtonsContainer };
