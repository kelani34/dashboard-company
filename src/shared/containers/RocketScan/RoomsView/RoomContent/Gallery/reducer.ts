import {
  galleryActionTypes,
  SET_PHOTO_UPLOADING_ROOM_ALBUM,
} from 'Containers/RocketScan/RoomsView/RoomContent/Gallery/actions';

const initialState = {
  photoUploadingRoomAndAlbum: undefined,
};

export const galleryReducer = (state = initialState, action: galleryActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PHOTO_UPLOADING_ROOM_ALBUM:
      return {
        ...state,
        photoUploadingRoomAndAlbum: payload,
      };
    default:
      return state;
  }
};
