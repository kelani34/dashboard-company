import { handleApiRequest } from 'Utils/handleApiRequest';

export const SET_PHOTO_UPLOADING_ROOM_ALBUM = 'SET_PHOTO_UPLOADING_ROOM_ALBUM';

interface ActionTypes {
  SET_PHOTO_UPLOADING_ROOM_ALBUM: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type galleryActionTypes = MessageAction;

/*
 * NON API THUNKS, NON ASYNC
 * */

export const setPhotoUploadingRoomAndAlbum = (payload: any) => (dispatch) => {
  dispatch({
    type: SET_PHOTO_UPLOADING_ROOM_ALBUM,
    payload,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */

export const listRoomPhotosPerAlbum =
  (roomId: number, albumId: number, pageNumber = 1) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`rooms/${roomId}/photos?filter[album]=${albumId}`, {
        params: {
          include: 'photo,notes_count',
          limit: 15,
          sort: '-created_at',
          page: pageNumber,
        },
      })
    );
  };
