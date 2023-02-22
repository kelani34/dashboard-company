import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Carousel } from 'bootstrap';
import { PhotoViewCarousal } from 'Components/PhotoViewCarousal';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentPageSelector,
  fetchingPhotosSelector,
  lastPageSelector,
  photosSelector,
} from 'Containers/PhotoViewCarousel/selector';
import { useLocation } from 'react-router-dom';
import { listPhotoShareCarouselPhotos } from 'Containers/Public/PhotoShare/PhotoShareCarousel/actions';
import { uuidSelector } from 'Containers/Public/PhotoShare/selectors';

const PhotoShareCarouselContainer = () => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const params = new URLSearchParams(search);

  // paginate start from photo id, this being set at photo container
  const startFrom = params.get('start_from');

  const carouselRef = useRef(undefined);

  const photos: Array<PhotoModal> = useSelector(photosSelector, areEqual);
  const currentPage = useSelector(currentPageSelector, areEqual);
  const lastPage = useSelector(lastPageSelector, areEqual);
  const fetching = useSelector(fetchingPhotosSelector, areEqual);
  const uuid = useSelector(uuidSelector);

  const [carousel, setCarousel] = useState(null);

  useEffect(() => {
    setCarousel(new Carousel(carouselRef.current));
  }, []);

  useEffect(() => {
    if (startFrom && uuid) {
      dispatch(listPhotoShareCarouselPhotos(uuid, startFrom, 1));
    }
  }, [startFrom, uuid]);

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
        dispatch(listPhotoShareCarouselPhotos(uuid, '', pageNumber));
      }
    }
  }, [uuid, carousel, lastPage, currentPage]);

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
        dispatch(listPhotoShareCarouselPhotos(uuid, '', pageNumber));
      }
    }
  }, [uuid, carousel, currentPage, lastPage]);

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

const PhotoShareCarouselContainerMemo = memo(PhotoShareCarouselContainer, areEqual);

export { PhotoShareCarouselContainerMemo as PhotoShareCarousel };
