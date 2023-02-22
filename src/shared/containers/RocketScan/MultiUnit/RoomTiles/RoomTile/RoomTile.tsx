import React, { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { RoomTile } from 'Components/RocketScan';
import { useOnScreen } from 'Hooks/useOnScreen';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { projectSelector } from 'Containers/RocketScan/selectors';
import { setLocation } from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { setSelectedRoomId } from 'Containers/RocketScan/RoomsView/RoomButtons/actions';
import { listPendingRoomAssemblies } from 'Containers/RocketScan/MultiUnit/RoomTiles/RoomTile/actions';
import { setRoomObject } from 'Containers/RocketScan/RoomsView/Rooms/actions';
import { checkIfPhotoSelected } from 'Utils/helpers';
import {
  selectAllModeSelector,
  selectedRoomsSelector,
  selectPhotosModeSelector,
  unSelectedRoomsSelector,
} from 'Containers/RocketScan/Header/ActionsCenter/selectors';
import { setSelectedRooms, setUnSelectedRooms } from 'Containers/RocketScan/Header/ActionsCenter/actions';
import { pusherSelector } from 'Containers/Core/selectors';

interface Props {
  location: any;
  roomId: number;
  roomName: string;
  photosCount: number;
  thumbnailSrcUrl?: string;
  isLastItem: boolean;
  currentPage: number;
  lastPage: number;
  roomsData: any;
  photos: any[];
  getRooms: (pageNumber: number) => void;
}

const RoomTileContainer = ({
  location,
  roomId,
  roomName,
  photosCount,
  thumbnailSrcUrl,
  isLastItem,
  currentPage,
  lastPage,
  roomsData,
  photos,
  getRooms,
}: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const ref = useRef(null);
  const mounted = useRef(false);

  const isOnScreen = useOnScreen(ref);

  const project = useSelector(projectSelector, areEqual);
  const pusher = useSelector(pusherSelector, areEqual);
  const selectPhotosMode = useSelector(selectPhotosModeSelector, areEqual);
  const selectAllMode = useSelector(selectAllModeSelector, areEqual);
  const selectedRooms = useSelector(selectedRoomsSelector, areEqual);
  const unSelectedRooms = useSelector(unSelectedRoomsSelector, areEqual);

  const [isLoading, setIsLoading] = useState(false);

  const onClick = useCallback(() => {
    if (selectPhotosMode && !selectAllMode && photos.length > 0) {
      dispatch(
        setSelectedRooms({
          id: roomId,
          photos,
          photos_count: photosCount,
        })
      );
    } else if (selectAllMode && photos.length > 0) {
      dispatch(
        setUnSelectedRooms({
          id: roomId,
          photos,
          photos_count: photosCount,
        })
      );
    } else {
      const { id: locationId } = location;
      const { id: projectId } = project;

      dispatch(setRoomObject(roomsData));
      dispatch(setLocation(location));
      dispatch(setSelectedRoomId(roomId));
      history.push(`/projects/${projectId}/rocketscan/multiunit/${locationId}`);
    }
  }, [roomsData, selectPhotosMode, selectAllMode, roomId, photos, photosCount]);

  const checkPending = useCallback(async () => {
    const response: any = await dispatch(listPendingRoomAssemblies(roomId));

    if (response?.data) {
      const { data } = response;
      setIsLoading(data.length > 0);
    }
  }, [roomId]);

  useEffect(() => {
    mounted.current = true;
    if (mounted.current) {
      (async () => {
        await checkPending();
      })();
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const photoUploaded = pusher
      ?.subscribe(`PhotoUploadingCompletedAnnouncement.Room.${roomId}`)
      ?.bind('App\\Events\\Websockets\\PhotoUploadingCompletedAnnouncement', checkPending);
    return () => {
      photoUploaded?.unsubscribe(`PhotoUploadingCompletedAnnouncement.Room.${roomId}`);
    };
  }, [pusher]);

  // lazy load next room tiles
  useEffect(() => {
    if (isOnScreen && isLastItem) {
      if (currentPage < lastPage) {
        (async function fetchData() {
          await getRooms(currentPage + 1);
        })();
      }
    }
  }, [isOnScreen]);

  useLayoutEffect(() => {
    if (selectAllMode) {
      dispatch(
        setSelectedRooms({
          id: roomId,
          photos,
          photosCount,
        })
      );
    } else {
      dispatch(setSelectedRooms({}));
    }
  }, [selectAllMode]);

  return (
    <RoomTile
      ref={ref}
      roomName={roomName}
      photosCount={photosCount}
      thumbnailSrcUrl={thumbnailSrcUrl}
      onClick={onClick}
      hasPendingAssemblies={isLoading}
      isRoomSelected={checkIfPhotoSelected(
        { id: roomId },
        selectedRooms,
        unSelectedRooms,
        selectPhotosMode,
        selectAllMode
      )}
    />
  );
};

RoomTileContainer.defaultProps = {
  thumbnailSrcUrl: undefined,
};

const RoomTileContainerMemo = memo(RoomTileContainer, areEqual);

export { RoomTileContainerMemo as RoomTile };
