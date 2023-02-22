import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Carousel } from 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { carouselPhotoDeletedSelector } from 'Containers/PhotoViewCarousel/selector';
import { useHistory, useLocation } from 'react-router-dom';
import { listCarouselPhotos } from 'Containers/RocketScan/PhotoView/Carousel/actions';
import {
  currentPageSelector,
  fetchingPhotosSelector,
  lastPageSelector,
  rocketScanPhotosSelector,
} from 'Containers/RocketScan/PhotoView/Carousel/selectors';
import { projectIdSelector } from 'Containers/RocketScan/selectors';
import { Carousal } from 'Components/RocketScan';
import { setCarouselPhotoDeleted } from 'Containers/PhotoViewCarousel/actions';

const CarouselContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const search = location.search;

  const carouselRef = useRef(undefined);

  // carousel selectors
  const photos = useSelector(rocketScanPhotosSelector, areEqual);
  const currentPage = useSelector(currentPageSelector, areEqual);
  const lastPage = useSelector(lastPageSelector, areEqual);
  const fetching = useSelector(fetchingPhotosSelector, areEqual);

  // other selectors
  const projectId = useSelector(projectIdSelector, areEqual);
  const carouselPhotoDeleted = useSelector(carouselPhotoDeletedSelector, areEqual);

  const [carousel, setCarousel] = useState(null);

  useEffect(() => {
    setCarousel(new Carousel(carouselRef.current));
  }, []);

  const getPhotos = useCallback(
    (pageNumber = 1, paginatedFromId = '') => {
      dispatch(listCarouselPhotos(projectId, paginatedFromId, pageNumber));
    },
    [projectId]
  );

  useEffect(() => {
    const params = new URLSearchParams(search);
    const photoId = params.get('photoId');
    const page = params.get('page');

    if (projectId && carousel) {
      getPhotos(page, photoId);
    }
  }, [projectId, carousel]);

  const photoViewRouteChange = useCallback(
    (projectId, pageNumber) => history.push(`/projects/${projectId}/rocketscan/photo-view?page=${pageNumber}`),
    []
  );

  // onClick next button we'll get the next image by increasing the pagination
  const onClickNext = useCallback(() => {
    let pageNumber = currentPage + 1;

    if (currentPage === lastPage) {
      pageNumber = 1;
    }

    getPhotos(pageNumber);
    photoViewRouteChange(projectId, pageNumber);
  }, [projectId, lastPage, currentPage]);

  // onClick previous button we'll get the previous image by decreasing the pagination
  const onClickPrevious = useCallback(() => {
    let pageNumber = currentPage - 1;

    if (currentPage === 1) {
      pageNumber = lastPage;
    }

    getPhotos(pageNumber);
    photoViewRouteChange(projectId, pageNumber);
  }, [projectId, currentPage, lastPage]);

  // if the user deletes a image, we'll perform the following actions
  useEffect(() => {
    if (carouselPhotoDeleted) {
      // to get the next available image
      let pageNumber = currentPage + 1;

      if (pageNumber === lastPage) {
        pageNumber = 1;
      }

      getPhotos(pageNumber);
      photoViewRouteChange(projectId, pageNumber);

      // redirect user back if the result is empty after photos deleted
      if (photos.length === 0) {
        // history.push(selectedUnitTypeUrl);
      }
    }

    // clear the deleted condition
    return () => {
      if (carouselPhotoDeleted) {
        dispatch(setCarouselPhotoDeleted(false));
      }
    };
  }, [carouselPhotoDeleted, photos, currentPage, lastPage]);

  return (
    <Carousal
      ref={carouselRef}
      photos={photos}
      fetching={fetching}
      onClickNext={onClickNext}
      onClickPrevious={onClickPrevious}
    />
  );
};

const CarouselContainerMemo = memo(CarouselContainer, areEqual);

export { CarouselContainerMemo as CarouselContainer };
