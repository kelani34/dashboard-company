import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';
import { useDispatch, useSelector } from 'react-redux';
import { carouselPhotoDeletedSelector } from 'Containers/PhotoViewCarousel/selector';

import { setCarouselPhotoDeleted } from 'Containers/PhotoViewCarousel/actions';
import { selectedPhotoSelector } from 'Containers/RocketScan/PhotoView/Carousel/selectors';
import { PhotoSettings } from 'Components/RocketScan/PhotoView/PhotoSettings';
import { togglePhotoBookmark, togglePhotoFlag } from '../../actions';

const PhotoSettingsContainer = () => {
  const dispatch = useDispatch();

  const selectedPhoto: PhotoModal = useSelector(selectedPhotoSelector, areEqual);
  const carouselPhotoDeleted = useSelector(carouselPhotoDeletedSelector, areEqual);

  const [isOpenDeletePhotoModal, setIsOpenDeletePhotoModal] = useState(false);
  const [photoId, setPhotoId] = useState(null);
  const [photoBookmarked, setPhotoBookmarked] = useState(false);
  const [photoFlagged, setPhotoFlagged] = useState(false);
  const [photoEdited, setPhotoEdited] = useState(undefined);

  const setPhotoInfo = useCallback(
    (photo) => {
      const { id, is_bookmarked: isBookmarked, is_flagged: isFlagged } = photo;
      setPhotoId(id);
      setPhotoBookmarked(isBookmarked);
      setPhotoFlagged(isFlagged);
    },
    [photoId, photoBookmarked, photoFlagged]
  );

  useEffect(() => {
    if (selectedPhoto?.id) {
      setPhotoInfo(selectedPhoto);
    }
  }, [selectedPhoto]);

  // set info if bookmark or flag is toggled
  useEffect(() => {
    if (photoEdited) {
      setPhotoInfo(photoEdited);
    }
  }, [photoEdited]);

  const onClickDeletePhotoButton = useCallback(() => {
    setIsOpenDeletePhotoModal(true);
  }, []);

  const onClickCloseDeletePhotoModal = useCallback(() => {
    setIsOpenDeletePhotoModal(false);
  }, []);

  const onClickBookmarkPhotoButton = useCallback(() => {
    dispatch(togglePhotoBookmark(photoId, setPhotoEdited));
  }, [photoId]);

  const onClickFlagPhotoButton = useCallback(() => {
    dispatch(togglePhotoFlag(photoId, setPhotoEdited));
  }, [photoId]);

  useEffect(() => {
    if (carouselPhotoDeleted) {
      setIsOpenDeletePhotoModal(false);
    }

    return () => {
      if (carouselPhotoDeleted) {
        dispatch(setCarouselPhotoDeleted(false));
      }
    };
  }, [carouselPhotoDeleted]);

  return (
    <PhotoSettings
      isOpenDeletePhotoModal={isOpenDeletePhotoModal}
      selectedPhoto={selectedPhoto}
      photoBookmarked={photoBookmarked}
      photoFlagged={photoFlagged}
      onClickDeletePhotoButton={onClickDeletePhotoButton}
      onClickCloseDeletePhotoModal={onClickCloseDeletePhotoModal}
      onClickBookmarkPhotoButton={onClickBookmarkPhotoButton}
      onClickFlagPhotoButton={onClickFlagPhotoButton}
    />
  );
};

const PhotoSettingsContainerMemo = memo(PhotoSettingsContainer, areEqual);

export { PhotoSettingsContainerMemo as PhotoSettingsContainer };
