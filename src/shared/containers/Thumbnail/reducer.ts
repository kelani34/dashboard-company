import { DeletePhotoActionTypes, PHOTO_DELETED } from './actions';

const initialState = {
  photoDeleted: '',
};

export const thumbnailReducer = (state = initialState, action: DeletePhotoActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case PHOTO_DELETED:
      return {
        ...state,
        photoDeleted: payload,
      };
    default:
      return state;
  }
};
