import {
  SET_NOTES,
  SET_THUMBNAIL_SRC,
  SET_IR_IMAGE,
  SET_IMAGE_ID,
  setPhotoViewActionTypes,
} from 'Containers/PhotoView/actions';

const initialState = {
  thumbnailSrcUrl:
    'https://storage-qa-mongoose-br2wu78v1.rocketplantech.com/photos/oPEGnx/bBr1pP/c5595a94-3ee4-40e8-8c8b-4538bcb3f3c2',
  irImageSrcUrl:
    'https://storage-qa-mongoose-br2wu78v1.rocketplantech.com/photos/oPEGnx/bBr1pP/c5595a94-3ee4-40e8-8c8b-4538bcb3f3c2',
  notes: [],
  id: 0,
};

export const photoViewReducer = (state = initialState, action: setPhotoViewActionTypes) => {
  switch (action.type) {
    case SET_THUMBNAIL_SRC:
      return {
        ...state,
        thumbnailSrcUrl: action.payload,
      };
    case SET_IR_IMAGE:
      return {
        ...state,
        irImageSrcUrl: action.payload,
      };
    case SET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case SET_IMAGE_ID:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};
