import {
  CURRENT_PAGE,
  FETCHING_PHOTOS,
  LAST_PAGE,
  PHOTO_DELETED,
  PHOTOS,
  SELECTED_PHOTO,
  setPhotoViewCarouselActionTypes,
  TOTAL,
} from 'Containers/PhotoViewCarousel/actions';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';

const initialState = {
  selectedPhoto: <PhotoModal>{},
  photos: <Array<PhotoModal>>[],
  total: undefined,
  currentPage: undefined,
  lastPage: undefined,
  fetchingPhotos: false,
  photoDeleted: false,
};

export const photoViewCarouselReducer = (state = initialState, action: setPhotoViewCarouselActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SELECTED_PHOTO:
      return {
        ...state,
        selectedPhoto: payload,
      };
    case PHOTOS: {
      return {
        ...state,
        photos: payload,
      };
    }
    case CURRENT_PAGE: {
      return {
        ...state,
        currentPage: payload,
      };
    }
    case LAST_PAGE: {
      return {
        ...state,
        lastPage: payload,
      };
    }
    case TOTAL: {
      return {
        ...state,
        total: payload,
      };
    }
    case FETCHING_PHOTOS: {
      return {
        ...state,
        fetchingPhotos: payload,
      };
    }
    case PHOTO_DELETED: {
      return {
        ...state,
        photoDeleted: payload,
      };
    }
    default:
      return state;
  }
};
