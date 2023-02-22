import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { updateRoomSourceStatus, setRoomSourceStatusUpdated } from 'Containers/ProjectData/LossData/actions';
import { roomSourceStatusUpdatedSelector } from 'Containers/ProjectData/LossData/selectors';

import { SourceMarker } from 'Components/SourceMarker';

interface Props {
  roomId: number;
  roomIsSource: boolean;
}

const SourceMarkerContainer = ({ roomId, roomIsSource }: Props) => {
  const dispatch = useDispatch();

  const roomSourceStatusUpdated = useSelector(roomSourceStatusUpdatedSelector, areEqual);

  useEffect(() => {
    if (roomSourceStatusUpdated) {
      dispatch(setRoomSourceStatusUpdated(false));
    }
  }, [roomSourceStatusUpdated]);

  const onSourceToggleClick = useCallback(() => {
    dispatch(updateRoomSourceStatus(roomId, !roomIsSource));
  }, [roomIsSource, roomId]);

  return <SourceMarker sourceIsChecked={roomIsSource} onSourceToggleClick={onSourceToggleClick} />;
};

const SourceMarkerContainerMemo = memo(SourceMarkerContainer, areEqual);

export { SourceMarkerContainerMemo as SourceMarker };
