import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { deleteSelectedPhotos } from 'Containers/RocketScan/Header/ActionsCenter/actions';

import { DeletePhotosPreviewModal } from 'Components/RocketScan';
import {
  photosCountSelector,
  selectAllModeSelector,
  selectedPhotosSelector,
  selectedRoomsSelector,
  unSelectedPhotosSelector,
  unSelectedRoomsSelector,
} from 'Containers/RocketScan/Header/ActionsCenter/selectors';
import { projectSelector } from 'Containers/RocketScan/selectors';
import { locationSelector } from 'Containers/RocketScan/MultiUnit/Locations/selectors';

interface Props {
  isOpen: boolean;
  locationType: string;
  onClickCloseDeletePhotos: (e: any) => void;
  setIsOpenDeleteModal: (e: any) => void;
}

// get id's from photos
const getPhotoIds = (photos: any[]) => photos.map(({ id }: any) => id);

const DeletePhotosPreviewModalContainer = ({
  isOpen,
  locationType,
  onClickCloseDeletePhotos,
  setIsOpenDeleteModal,
}: Props) => {
  const dispatch = useDispatch();

  const project = useSelector(projectSelector, areEqual);
  const location = useSelector(locationSelector, areEqual);
  const selectedRooms = useSelector(selectedRoomsSelector, areEqual);
  const unSelectedRooms = useSelector(unSelectedRoomsSelector, areEqual);
  const selectAllMode = useSelector(selectAllModeSelector, areEqual);
  const selectedPhotos = useSelector(selectedPhotosSelector, areEqual);
  const unSelectedPhotos = useSelector(unSelectedPhotosSelector, areEqual);
  const photosCount = useSelector(photosCountSelector, areEqual);

  const onClickDeletePhotosButton = useCallback(() => {
    const projectId = project?.id;
    const roomIds = selectedRooms.map(({ id }: any) => id);
    const unSelectedRoomIds = unSelectedRooms.map(({ id }: any) => id);

    if (!projectId) {
      alert('something went wrong!');
    } else {
      if (!selectAllMode) {
        if (locationType === 'roomsview') {
          dispatch(
            deleteSelectedPhotos(
              projectId,
              {
                photo_ids: getPhotoIds(selectedPhotos),
              },
              setIsOpenDeleteModal
            )
          );
        } else {
          dispatch(
            deleteSelectedPhotos(
              projectId,
              {
                room_ids: roomIds,
              },
              setIsOpenDeleteModal
            )
          );
        }
      }

      if (selectAllMode) {
        if (locationType === 'roomsview') {
          dispatch(
            deleteSelectedPhotos(
              projectId,
              {
                location_ids: [location.id],
                exclude_photo_ids: getPhotoIds(unSelectedPhotos),
              },
              setIsOpenDeleteModal
            )
          );
        } else {
          dispatch(
            deleteSelectedPhotos(
              projectId,
              {
                project_id: projectId,
                exclude_room_ids: unSelectedRoomIds,
              },
              setIsOpenDeleteModal
            )
          );
        }
      }
    }
  }, [project, locationType, selectedPhotos, location, unSelectedPhotos, selectAllMode, unSelectedRooms]);

  return (
    <DeletePhotosPreviewModal
      isOpen={isOpen}
      photosCount={photosCount}
      onClickCloseDeletePhotos={onClickCloseDeletePhotos}
      onClickDeleteButton={onClickDeletePhotosButton}
    />
  );
};

const DeletePhotosPreviewModalContainerMemo = memo(DeletePhotosPreviewModalContainer, areEqual);

export { DeletePhotosPreviewModalContainerMemo as DeletePhotosPreviewModal };
