import React, { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPhotoSharePhotosCount,
  setSelectAllMode,
  setSelectedPhotoIds,
  setSelectPhotosMode,
  setUnSelectedPhotoIds,
} from 'Containers/RocketScan/Header/ActionsCenter/actions';
import {
  locationsPhotosCountSelector,
  photosCountSelector,
  projectPhotosCountSelector,
  selectAllModeSelector,
  selectedPhotosSelector,
  selectedRoomsSelector,
  selectPhotosModeSelector,
  unSelectedPhotosSelector,
  unSelectedRoomsSelector,
} from 'Containers/RocketScan/Header/ActionsCenter/selectors';
import { SelectActionsCentre } from 'Components/RocketScan';
import { PhotoSharePreviewModal, DeletePhotosPreviewModal } from 'Containers/RocketScan';
import { parseNumber } from 'Utils/numbers';
import { useLocation } from 'react-router-dom';

const getRoomPhotos = (rooms: any[]) => {
  const photosList = [];
  let roomsPhotoCount = 0;

  if (rooms.length > 0) {
    rooms.forEach((room: any) => {
      const { photos, photos_count: photosCount } = room;

      if (photos.length > 0) {
        photos.forEach((photo: any) => {
          photosList.push(photo);
        });
        roomsPhotoCount += parseNumber(photosCount);
      }
    });
  }

  return {
    photosList,
    roomsPhotoCount,
  };
};

interface Props {
  locationType: string;
  propertyType: string;
}

const ActionsCenterContainer = ({ locationType, propertyType }: Props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // local state
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [allPhotos, setAllPhotos] = useState([]);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // enable or disable selectors
  const selectPhotosMode = useSelector(selectPhotosModeSelector, areEqual);
  const selectAllMode = useSelector(selectAllModeSelector, areEqual);

  // to hold selected or unselected photos id to use in the API
  // use these to generate preview modal when we have rooms view, not sure how to work on locations view yet
  const selectedPhotos = useSelector(selectedPhotosSelector, areEqual);
  const unSelectedPhotos = useSelector(unSelectedPhotosSelector, areEqual);

  const photosCount = useSelector(photosCountSelector, areEqual);
  const selectedRooms = useSelector(selectedRoomsSelector, areEqual);
  const unSelectedRooms = useSelector(unSelectedRoomsSelector, areEqual);

  // core selectors
  const projectPhotosCount = useSelector(projectPhotosCountSelector, areEqual);
  const locationsPhotosCount = useSelector(locationsPhotosCountSelector, areEqual);

  const onSelectAllClick = useCallback(() => {
    dispatch(setSelectAllMode(!selectAllMode));

    if (selectAllMode) {
      dispatch(setSelectedPhotoIds([]));
      dispatch(setUnSelectedPhotoIds([]));
      setAllPhotos([]);
    }
  }, [selectAllMode, allPhotos]);

  const onSelectButtonClick = useCallback(() => {
    dispatch(setSelectPhotosMode(!selectPhotosMode));

    if (selectPhotosMode) {
      dispatch(setSelectAllMode(false));
      dispatch(setSelectedPhotoIds([]));
      dispatch(setUnSelectedPhotoIds([]));
      setAllPhotos([]);
    }
  }, [selectPhotosMode]);

  const onClickPhotoShareButton = useCallback(
    (e: any) => {
      e.preventDefault();

      setIsOpenShareModal(true);
    },
    [allPhotos]
  );

  const modalCloseClickPhotoShare = useCallback((e: any) => {
    e.preventDefault();
    setIsOpenShareModal(false);
  }, []);

  const onClickDeletePhotosIcon = useCallback((e: any) => {
    e.preventDefault();
    setIsOpenDeleteModal(true);
  }, []);

  const modalCloseClickDeletePhotos = useCallback((e: any) => {
    e.preventDefault();
    setIsOpenDeleteModal(false);
  }, []);

  // calculate photo counts and set photos for preview based on property and other conditions
  useLayoutEffect(() => {
    // calculate photo counts when we have rooms view (gallery view)
    if (locationType === 'roomsview' && (propertyType === 'singleunit' || propertyType === 'multiunit')) {
      if (selectPhotosMode) {
        if (selectAllMode) {
          const { photosList } = getRoomPhotos(selectedRooms);
          dispatch(setSelectedPhotoIds(photosList));

          dispatch(setPhotoSharePhotosCount(parseNumber(locationsPhotosCount) - parseNumber(unSelectedPhotos.length)));
        } else {
          dispatch(setPhotoSharePhotosCount(parseNumber(selectedPhotos.length)));
        }
      } else {
        dispatch(setPhotoSharePhotosCount(0));
      }
    }
  }, [
    locationType,
    propertyType,
    locationsPhotosCount,
    selectPhotosMode,
    selectAllMode,
    selectedPhotos,
    unSelectedPhotos,
    selectedRooms,
  ]);

  // set photos and count in locations view
  useLayoutEffect(() => {
    if (propertyType === 'multiunit' && locationType !== 'roomsview') {
      if (selectPhotosMode) {
        const { photosList, roomsPhotoCount } = getRoomPhotos(selectedRooms);
        dispatch(setSelectedPhotoIds(photosList));

        if (selectAllMode) {
          const { photosList, roomsPhotoCount } = getRoomPhotos(unSelectedRooms);

          dispatch(setUnSelectedPhotoIds(photosList));

          if (roomsPhotoCount > 0) {
            dispatch(setPhotoSharePhotosCount(parseNumber(projectPhotosCount) - roomsPhotoCount));
          } else {
            dispatch(setPhotoSharePhotosCount(parseNumber(projectPhotosCount)));
          }
        } else {
          dispatch(setPhotoSharePhotosCount(parseNumber(roomsPhotoCount)));
        }
      } else {
        dispatch(setPhotoSharePhotosCount(0));
      }
    }
  }, [locationType, propertyType, projectPhotosCount, selectPhotosMode, selectAllMode, selectedRooms, unSelectedRooms]);

  // reset to default on route change
  useEffect(
    () => () => {
      dispatch(setSelectAllMode(false));
      dispatch(setSelectPhotosMode(false));
      dispatch(setSelectedPhotoIds([]));
      dispatch(setUnSelectedPhotoIds([]));
      dispatch(setPhotoSharePhotosCount(0));
    },
    [pathname]
  );

  return (
    <div>
      <SelectActionsCentre
        onSelectAllClick={onSelectAllClick}
        onSelectButtonClick={onSelectButtonClick}
        isOpen={selectPhotosMode}
        photoCount={photosCount}
        shareSelectionClick={onClickPhotoShareButton}
        deleteSelectionClick={onClickDeletePhotosIcon}
      />

      <PhotoSharePreviewModal
        isOpen={isOpenShareModal}
        locationType={locationType}
        onClickClosePhotoShare={modalCloseClickPhotoShare}
      />

      <DeletePhotosPreviewModal
        isOpen={isOpenDeleteModal}
        locationType={locationType}
        onClickCloseDeletePhotos={modalCloseClickDeletePhotos}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />
    </div>
  );
};

const ActionsCenterContainerMemo = memo(ActionsCenterContainer, areEqual);

export { ActionsCenterContainerMemo as ActionsCenterContainer };
