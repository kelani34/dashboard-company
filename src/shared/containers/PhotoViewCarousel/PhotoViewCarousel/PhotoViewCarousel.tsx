import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { areEqual, areEqualShallow } from 'Utils/equalityChecks';
import { Carousel } from 'bootstrap';
import { PhotoViewCarousal } from 'Components/PhotoViewCarousal';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';
import { useDispatch, useSelector } from 'react-redux';
import {
  carouselPhotoDeletedSelector,
  currentPageSelector,
  fetchingPhotosSelector,
  lastPageSelector,
  photosSelector,
} from 'Containers/PhotoViewCarousel/selector';
import { listCarouselPhotos, setCarouselPhotoDeleted } from 'Containers/PhotoViewCarousel/actions';
import { selectedMultiUnitSelector } from 'Containers/Project/Unit/selector';
import { projectIdSelector } from 'Containers/Project/selectors';
import { useHistory } from 'react-router-dom';
import { selectedUnitTypeUrlSelector } from 'Containers/AddLocationTab/selector';

const PhotoViewCarouselContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const carouselRef = useRef(undefined);

  const photos: Array<PhotoModal> = useSelector(photosSelector, areEqual);
  const currentPage = useSelector(currentPageSelector, areEqual);
  const lastPage = useSelector(lastPageSelector, areEqual);
  const fetching = useSelector(fetchingPhotosSelector, areEqual);
  const selectedMultiUnit = useSelector(selectedMultiUnitSelector, areEqual);
  const selectedProjectId = useSelector(projectIdSelector, areEqual);
  const carouselPhotoDeleted = useSelector(carouselPhotoDeletedSelector, areEqual);
  const selectedUnitTypeUrl = useSelector(selectedUnitTypeUrlSelector, areEqualShallow);

  const [carousel, setCarousel] = useState(null);

  useEffect(() => {
    setCarousel(new Carousel(carouselRef.current));
  }, []);

  // onClick next button we'll get the next image by increasing the pagination
  const onClickNext = useCallback(() => {
    if (carousel) {
      let pageNumber = currentPage;

      if (pageNumber < lastPage) {
        pageNumber += 1;
      } else if (pageNumber === lastPage) {
        pageNumber = 1;
      }

      if (lastPage !== 1) {
        dispatch(listCarouselPhotos(selectedProjectId, selectedMultiUnit?.type, '', pageNumber));
      }
    }
  }, [carousel, lastPage, currentPage]);

  // onClick previous button we'll get the previous image by decreasing the pagination
  const onClickPrevious = useCallback(() => {
    if (carousel) {
      let pageNumber = currentPage;

      if (pageNumber <= lastPage) {
        pageNumber -= 1;
      }

      if (pageNumber === 0) {
        pageNumber = lastPage;
      }

      if (lastPage !== 1) {
        dispatch(listCarouselPhotos(selectedProjectId, selectedMultiUnit?.type, '', pageNumber));
      }
    }
  }, [carousel, currentPage, lastPage]);

  // if the user deletes a image, we'll perform the following actions
  useEffect(() => {
    if (carouselPhotoDeleted) {
      // get the next available image
      let pageNumber = currentPage + 1;

      if (pageNumber === lastPage) {
        pageNumber = 1;
      }

      dispatch(listCarouselPhotos(selectedProjectId, selectedMultiUnit?.type, '', pageNumber));

      // redirect user back if the result is empty after photos deleted
      if (photos.length === 0) {
        history.push(selectedUnitTypeUrl);
      }
    }

    // clear the deleted condition
    return () => {
      if (carouselPhotoDeleted) {
        dispatch(setCarouselPhotoDeleted(false));
      }
    };
  }, [carouselPhotoDeleted, photos, selectedUnitTypeUrl, currentPage, lastPage]);

  return (
    <PhotoViewCarousal
      ref={carouselRef}
      photos={photos}
      fetching={fetching}
      onClickNext={onClickNext}
      onClickPrevious={onClickPrevious}
    />
  );
};

const PhotoViewCarouselContainerMemo = memo(PhotoViewCarouselContainer, areEqual);

export { PhotoViewCarouselContainerMemo as PhotoViewCarousel };
