import {
  carouselActionTypes,
  FETCHING_ROCKET_SCAN_PHOTOS,
  SET_META_DATA,
  SET_ROCKET_SCAN_PHOTOS,
  SET_ROCKET_SCAN_SELECTED_PHOTO,
  SET_ROCKETSCAN_ROUTE_PATH,
} from 'Containers/RocketScan/PhotoView/Carousel/actions';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';

const initialState = {
  photos: [],
  selectedPhoto: <PhotoModal>{},
  currentPage: 1,
  lastPage: 1,
  total: 0,
  fetchingRocketScanPhotos: true,
  rocketScanRoutePath: '',
};

export const rocketScanCarouselReducer = (state = initialState, action: carouselActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ROCKET_SCAN_PHOTOS:
      return {
        ...state,
        photos: payload,
      };
    case SET_ROCKET_SCAN_SELECTED_PHOTO:
      return {
        ...state,
        selectedPhoto: payload,
      };
    case SET_META_DATA:
      const { currentPage, lastPage, total } = payload;
      return {
        ...state,
        currentPage,
        lastPage,
        total,
      };
    case FETCHING_ROCKET_SCAN_PHOTOS:
      return {
        ...state,
        fetchingRocketScanPhotos: payload,
      };
    case SET_ROCKETSCAN_ROUTE_PATH:
      return {
        ...state,
        rocketScanRoutePath: payload,
      };
    default:
      return state;
  }
};
