import React, { memo, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { PhotoSharePreviewModal } from 'Components/RocketScan';
import {
  unSelectedPhotosSelector,
  selectedPhotosSelector,
  selectAllModeSelector,
  photosCountSelector,
  selectedRoomsSelector,
  unSelectedRoomsSelector,
} from 'Containers/RocketScan/Header/ActionsCenter/selectors';
import { projectSelector } from 'Containers/RocketScan/selectors';
import { createPhotoShare } from 'Containers/RocketScan/Header/ActionsCenter/actions';
import { locationSelector } from 'Containers/RocketScan/MultiUnit/Locations/selectors';

interface Props {
  isOpen: boolean;
  locationType: string;
  onClickClosePhotoShare: (e: any) => void;
}

const PhotoSharePreviewModalContainer = ({ isOpen, locationType, onClickClosePhotoShare }: Props) => {
  const dispatch = useDispatch();

  const selectedPhotos = useSelector(selectedPhotosSelector, areEqual);
  const unSelectedPhotos = useSelector(unSelectedPhotosSelector, areEqual);
  const project = useSelector(projectSelector, areEqual);
  const selectAllMode = useSelector(selectAllModeSelector, areEqual);
  const photoCount = useSelector(photosCountSelector, areEqual);
  const location = useSelector(locationSelector, areEqual);
  const selectedRooms = useSelector(selectedRoomsSelector, areEqual);
  const unSelectedRooms = useSelector(unSelectedRoomsSelector, areEqual);

  const [linkGenerated, setLinkGenerated] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [unSelectedPhotoIds, setUnSelectedPhotoIds] = useState([]);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setSelectedPhotoIds(
      selectedPhotos.filter((selectedPhotoIds) => selectedPhotoIds.id).map((filteredPhotos) => filteredPhotos.id)
    );
  }, [selectedPhotos]);

  // reset modal if closed
  useEffect(() => {
    if (!isOpen) {
      setLinkGenerated(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (unSelectedPhotos?.length) {
      setUnSelectedPhotoIds(
        unSelectedPhotos.filter((unSelectedPhoto) => unSelectedPhoto.id).map((filteredPhotos) => filteredPhotos.id)
      );
    }
  }, [unSelectedPhotos]);

  useEffect(() => {
    if (project?.id) {
      const { id } = project;
      setProjectId(id);
    }
  }, [project]);

  // Toast timeout
  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 1500);
    }
  }, [showToast]);

  const onClickGenerateLinkButton = useCallback(
    (e: any) => {
      e.preventDefault();

      const roomIds = selectedRooms.map(({ id }: any) => id);
      const unSelectedRoomIds = unSelectedRooms.map(({ id }: any) => id);

      if (!selectAllMode) {
        if (locationType === 'roomsview') {
          dispatch(
            createPhotoShare(
              projectId,
              {
                photo_ids: selectedPhotoIds,
              },
              setLinkGenerated
            )
          );
        } else {
          dispatch(
            createPhotoShare(
              projectId,
              {
                room_ids: roomIds,
              },
              setLinkGenerated
            )
          );
        }
      }

      if (selectAllMode) {
        if (locationType === 'roomsview') {
          dispatch(
            createPhotoShare(
              projectId,
              {
                location_ids: [location?.id],
                exclude_photo_ids: unSelectedPhotoIds,
              },
              setLinkGenerated
            )
          );
        } else {
          dispatch(
            createPhotoShare(
              projectId,
              {
                project_id: projectId,
                exclude_room_ids: unSelectedRoomIds,
              },
              setLinkGenerated
            )
          );
        }
      }
    },
    [
      projectId,
      unSelectedPhotoIds,
      selectAllMode,
      selectedPhotoIds,
      location,
      locationType,
      selectedRooms,
      unSelectedRooms,
    ]
  );

  const onPreviousIconClick = useCallback((e: any) => {
    e.preventDefault();
    setLinkGenerated(false);
  }, []);

  return (
    <PhotoSharePreviewModal
      isOpen={isOpen}
      linkGenerated={linkGenerated}
      photosCount={photoCount}
      showToast={showToast}
      toastMessage={toastMessage}
      setToastMessage={setToastMessage}
      setShowToast={setShowToast}
      onClickClosePhotoShare={onClickClosePhotoShare}
      onClickGenerateLinkButton={onClickGenerateLinkButton}
      onPreviousIconClick={onPreviousIconClick}
    />
  );
};

const PhotoSharePreviewModalContainerMemo = memo(PhotoSharePreviewModalContainer, areEqual);

export { PhotoSharePreviewModalContainerMemo as PhotoSharePreviewModalContainer };
