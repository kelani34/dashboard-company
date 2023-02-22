/* eslint-disable */

import { handleApiRequest } from 'Utils/handleApiRequest';

export const FILE_UPLOADING_ROOM_ALBUM = 'FILE_UPLOADING_ROOM_ALBUM';
export const REFRESH_ROOM_PHOTOS = 'REFRESH_ROOM_PHOTOS';

interface ActionTypes {
  FILE_UPLOADING_ROOM_ALBUM: number;
  REFRESH_ROOM_PHOTOS: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type setDropZoneActionTypes = MessageAction;

export const attachAlbumPhoto =
  (photoId: number, albumId: number, refreshPhotos?: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(
        `photos/${photoId}/albums/${albumId}
`,
        {}
      )
    );

    // refresh photo gallery photos once the last item attached to the album
    if (typeof response === 'string' && refreshPhotos?.refresh) {
      dispatch(setRefreshRoomPhotos(refreshPhotos));
    }
  };

/*
 * NON API THUNKS
 * */

export const setFileUploadingRoom = (roomAndAlbum: any) => async (dispatch: any) => {
  dispatch({
    type: FILE_UPLOADING_ROOM_ALBUM,
    payload: roomAndAlbum,
  });
};

export const setRefreshRoomPhotos = (value: any) => async (dispatch: any) => {
  dispatch({
    type: REFRESH_ROOM_PHOTOS,
    payload: value,
  });
};
