import {
  rocketScanActionCenterActionTypes,
  GET_PHOTO_SHARE_LINK,
  SET_SELECT_ALL_MODE,
  SET_SELECT_PHOTOS_MODE,
  PHOTOS_DELETED,
  SET_SELECTED_PHOTO_IDS,
  SET_UNSELECTED_PHOTO_IDS,
  PHOTO_SHARE,
  PHOTO_SHARE_ERRORS,
  SET_PHOTO_SHARE_SENT,
  SET_SELECTED_ROOMS,
  SET_UNSELECTED_ROOMS,
  SET_PHOTO_SHARE_PHOTOS_COUNT,
  SET_PROJECT_PHOTOS_COUNT,
  SET_LOCATIONS_PHOTOS_COUNT,
} from 'Containers/RocketScan/Header/ActionsCenter/actions';
import { addOrRemoveFromArray } from 'Utils/helpers';

const initialState = {
  photoShareLink: '',
  selectPhotosMode: false,
  selectAllMode: false,
  selectedPhotoIds: [],
  unSelectedPhotoIds: [],
  photosDeleted: false,
  photoShare: [],
  sent: false,
  selectedRooms: [],
  unSelectedRooms: [],
  projectPhotosCount: 0,
  locationsPhotosCount: 0,
  photosCount: 0,
};

export const rocketScanActionsCenterReducer = (state = initialState, action: rocketScanActionCenterActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PHOTO_SHARE_LINK:
      return {
        ...state,
        photoShareLink: payload,
      };
    case SET_SELECT_PHOTOS_MODE:
      return {
        ...state,
        selectPhotosMode: payload,
      };
    case SET_SELECT_ALL_MODE:
      return {
        ...state,
        selectAllMode: payload,
      };
    case SET_SELECTED_PHOTO_IDS:
      return {
        ...state,
        selectedPhotoIds: payload,
      };
    case SET_UNSELECTED_PHOTO_IDS:
      return {
        ...state,
        unSelectedPhotoIds: payload,
      };
    case PHOTOS_DELETED:
      return {
        ...state,
        photosDeleted: payload,
      };
    case PHOTO_SHARE:
      return {
        ...state,
        photoShare: payload,
      };
    case PHOTO_SHARE_ERRORS:
      return {
        ...state,
        photoShareErrors: payload,
      };
    case SET_PHOTO_SHARE_SENT:
      return {
        ...state,
        sent: payload,
      };
    case SET_SELECTED_ROOMS: {
      const prevRooms = state.selectedRooms;
      let selectedRooms = [];

      if (payload?.id) {
        if (prevRooms.length === 0) {
          selectedRooms = [payload];
        } else {
          selectedRooms = addOrRemoveFromArray(prevRooms, payload);
        }
      }

      return {
        ...state,
        selectedRooms,
      };
    }
    case SET_UNSELECTED_ROOMS: {
      const prevRooms = state.unSelectedRooms;
      let unSelectedRooms = [];

      if (payload?.id) {
        if (prevRooms.length === 0 && payload?.id) {
          unSelectedRooms = [payload];
        } else {
          unSelectedRooms = addOrRemoveFromArray(prevRooms, payload);
        }
      }

      return {
        ...state,
        unSelectedRooms,
      };
    }
    case SET_PROJECT_PHOTOS_COUNT:
      return {
        ...state,
        projectPhotosCount: payload,
      };
    case SET_LOCATIONS_PHOTOS_COUNT:
      return {
        ...state,
        locationsPhotosCount: payload,
      };
    case SET_PHOTO_SHARE_PHOTOS_COUNT:
      return {
        ...state,
        photosCount: payload,
      };
    default:
      return state;
  }
};
