import { FILE_UPLOADING_ROOM_ALBUM, REFRESH_ROOM_PHOTOS, setDropZoneActionTypes } from 'Containers/DropZone/actions';

const initialState = {
  fileUploadingRoomAndRoom: undefined,
  refreshRoomPhotos: {},
};

export const dropZoneReducer = (state = initialState, action: setDropZoneActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case FILE_UPLOADING_ROOM_ALBUM:
      return {
        ...state,
        fileUploadingRoomAndRoom: payload,
      };
    case REFRESH_ROOM_PHOTOS:
      return {
        ...state,
        refreshRoomPhotos: payload,
      };
    default:
      return state;
  }
};
