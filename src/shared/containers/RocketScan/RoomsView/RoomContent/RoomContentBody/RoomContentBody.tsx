import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { categoriesSelector, propertySelector } from 'Containers/RocketScan/selectors';

import { Galleries, RoomNotes } from 'Containers/RocketScan';
import { listPendingRoomAssemblies } from 'Containers/RocketScan/MultiUnit/RoomTiles/RoomTile/actions';
import { LoadingBox } from 'Components/RocketScan/LoadingBox';
import { NoPhotoPlaceholder, DamagedMaterialsWrapper } from 'Components/RocketScan';
import { uploadingAlbumsSelector } from 'Containers/RocketScan/RoomsView/Rooms/selectors';
import { setUploadingAlbums } from 'Containers/RocketScan/RoomsView/Rooms/actions';
import { useRoomFunctions } from 'Context/RocketScan';
import { pusherSelector } from 'Containers/Core/selectors';
import { getRoomDamageMaterials } from 'Containers/RocketScan/RoomsView/DamagedMaterials/actions';

interface Props {
  room: any;
  editable: boolean;
  hasBookmarked?: boolean;
  hasFlagged?: boolean;
  setAlbumPhotos: (e: any) => void;
  onEditButtonClick: (e: any) => void;
}

const RoomContentBodyContainer = ({
  room,
  editable,
  hasBookmarked,
  hasFlagged,
  setAlbumPhotos,
  onEditButtonClick,
}: Props) => {
  const { id: roomId, photo_albums: photoAlbums } = room;

  const dispatch = useDispatch();

  const mounted = useRef(false);
  const ref = useRef(null);

  const { showLoadingSpinner, setShowLoadingSpinner }: any = useRoomFunctions();

  const property = useSelector(propertySelector, areEqual);
  const pusher = useSelector(pusherSelector, areEqual);
  const notesCategories = useSelector(categoriesSelector, areEqual);
  const uploadingAlbums = useSelector(uploadingAlbumsSelector);
  const [roomDamagedMaterials, setRoomDamagedMaterials] = useState(undefined);

  const checkPending = useCallback(async () => {
    const response: any = await dispatch(listPendingRoomAssemblies(roomId));
    if (response?.data && mounted.current) {
      const { data } = response;
      setShowLoadingSpinner(data.length > 0);

      // clear uploading albums array
      if (data.length === 0 && uploadingAlbums.length > 0) {
        uploadingAlbums.forEach(({ albumId, roomId }: any) => {
          dispatch(
            setUploadingAlbums({
              albumId,
              roomId,
              clear: true,
            })
          );
        });
      }
    }
  }, [roomId, mounted, uploadingAlbums]);

  // initial API to check assembly status
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

  // check for assembly status after photo uploads, this is to trigger the spinner
  useEffect(() => {
    const photoUploaded = pusher
      .subscribe(`PhotoUploadingCompletedAnnouncement.Room.${roomId}`)
      .bind('App\\Events\\Websockets\\PhotoUploadingCompletedAnnouncement', checkPending);
    return () => {
      photoUploaded.unsubscribe(`PhotoUploadingCompletedAnnouncement.Room.${roomId}`);
    };
  }, []);

  const getDamageMaterials = useCallback(async () => {
    const response: any = await dispatch(getRoomDamageMaterials(roomId));

    if (mounted) {
      if (response?.data) {
        setRoomDamagedMaterials(response.data);
      }
    } else {
      setRoomDamagedMaterials(undefined);
    }
  }, []);

  // initial fetch for damage materials
  useEffect(() => {
    if (roomId) {
      (async function fetchData() {
        await getDamageMaterials();
      })();
    }
  }, [roomId]);

  return (
    <div ref={ref}>
      {showLoadingSpinner && <LoadingBox />}
      {photoAlbums?.length > 0 || editable ? (
        <Galleries roomId={roomId} editable={editable} photoAlbums={photoAlbums} setAlbumPhotos={setAlbumPhotos} />
      ) : (
        <NoPhotoPlaceholder onClickEditButton={onEditButtonClick} />
      )}
      {property?.name !== 'singlelocation' && (
        <RoomNotes
          placeholder="Add your room notes here"
          title="Room Notes"
          roomId={roomId}
          category={notesCategories.photo}
          hasBookmarked={hasBookmarked}
          hasFlagged={hasFlagged}
        />
      )}
      {/* temp fix for room damage materials not loaded when re-entering rooms.
        need to figure out why the room object in reducer has everything but damage_materials */}
      {roomDamagedMaterials && <DamagedMaterialsWrapper roomId={roomId} roomDamagedMaterials={roomDamagedMaterials} />}

      <RoomNotes
        placeholder="Add your damaged material notes here"
        title="Damaged Material Notes"
        category={notesCategories.damage}
        roomId={roomId}
      />
    </div>
  );
};

RoomContentBodyContainer.defaultProps = {
  hasBookmarked: undefined,
  hasFlagged: undefined,
};

const RoomContentBodyContainerMemo = memo(RoomContentBodyContainer, areEqual);

export { RoomContentBodyContainerMemo as RoomContentBody };
