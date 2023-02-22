import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { RoomButtons } from 'Components/RocketScan';
import { useDispatch, useSelector } from 'react-redux';
import { selectedRoomIdSelector } from 'Containers/RocketScan/RoomsView/RoomButtons/selectors';
import { setSelectedRoomId } from 'Containers/RocketScan/RoomsView/RoomButtons/actions';
import { propertySelector } from 'Containers/RocketScan/selectors';

interface Props {
  levelRooms: any[];
  locationId: number;
}

const RoomButtonsContainer = ({ levelRooms, locationId }: Props) => {
  const dispatch = useDispatch();

  const selectedRoomId = useSelector(selectedRoomIdSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);

  const onClickRoomButton = useCallback((id: number) => {
    dispatch(setSelectedRoomId(id));
  }, []);

  return (
    <RoomButtons
      hideLevel={property?.name === 'singlelocation'}
      levelRooms={levelRooms}
      locationId={locationId}
      selectedRoomId={selectedRoomId}
      onClickRoomButton={onClickRoomButton}
    />
  );
};

const RoomButtonsContainerMemo = memo(RoomButtonsContainer, areEqual);

export { RoomButtonsContainerMemo as RoomButtons };
