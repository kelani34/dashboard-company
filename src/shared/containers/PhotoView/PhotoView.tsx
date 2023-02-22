import React, { memo, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { areEqual, areEqualShallow } from 'Utils/equalityChecks';

import { PhotoView } from 'Components/PhotoView';

import { useDispatch, useSelector } from 'react-redux';
import { notesSelector } from 'Containers/PhotoView/selectors';
import { selectedUnitTypeUrlSelector } from 'Containers/AddLocationTab/selector';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';
import { carouselPhotoDeletedSelector, selectedPhotoSelector } from 'Containers/PhotoViewCarousel/selector';
import { setCarouselPhotoDeleted } from 'Containers/PhotoViewCarousel/actions';

const PhotoViewContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const selectedUnitTypeUrl = useSelector(selectedUnitTypeUrlSelector, areEqualShallow);
  const notes = useSelector(notesSelector, areEqual);
  const carouselPhotoDeleted = useSelector(carouselPhotoDeletedSelector, areEqual);
  const selectedPhoto: PhotoModal = useSelector(selectedPhotoSelector, areEqual);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const setModalStatus = useCallback(() => {
    setIsModalOpen((isModalOpen: boolean) => !isModalOpen);
  }, []);

  const modalCloseClick = useCallback(
    (e: any) => {
      e.preventDefault();
      setIsModalOpen(false);
    },
    [isModalOpen]
  );

  // if the photo has been deleted from Add locations screen
  useEffect(() => {
    if (carouselPhotoDeleted) {
      setIsModalOpen(false);
    }

    return () => {
      if (carouselPhotoDeleted) {
        dispatch(setCarouselPhotoDeleted(false));
      }
    };
  }, [carouselPhotoDeleted]);

  const onClickBack = useCallback(() => {
    // This will return the user to either the SingleUnit or MultiUnit View
    history.push(selectedUnitTypeUrl);
  }, [selectedUnitTypeUrl]);

  return (
    <PhotoView
      imageId={selectedPhoto?.id}
      notes={notes}
      onClickBack={onClickBack}
      setModalStatus={setModalStatus}
      isOpen={isModalOpen}
      modalCloseClick={modalCloseClick}
    />
  );
};

const PhotoViewContainerMemo = memo(PhotoViewContainer, areEqual);

export { PhotoViewContainerMemo as PhotoView };
