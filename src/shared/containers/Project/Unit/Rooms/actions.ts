/* eslint-disable */
import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';

export const SET_ALL_ROOMS = 'SET_ALL_ROOMS';
export const SET_ALL_ROOMS_WITH_PHOTOS = 'SET_ALL_ROOMS_WITH_PHOTOS';
export const SET_UNIT_ROOMS_WITH_PHOTOS = 'SET_UNIT_ROOMS_WITH_PHOTOS';
export const SET_SELECTED_ROOM_ID = 'SET_SELECTED_ROOM_ID';
export const SET_ALBUMS = 'SET_ALBUMS';
export const SET_PHOTOS = 'SET_PHOTOS';
export const SET_ROOMS_ALBUMS_PHOTOS = 'SET_ROOMS_ALBUMS_PHOTOS';
export const SET_ROOM_LEVEL = 'SET_ROOM_LEVEL';
export const FETCHING_ROOMS = 'FETCHING_ROOMS';
export const FETCHING_ALBUMS = 'FETCHING_ALBUMS';
export const PHOTO_CREATED = 'PHOTO_CREATED';
export const ROOM_LEVEL_UPDATED = 'ROOM_LEVEL_UPDATED';
export const SELECTED_UNIT_ROOMS = 'SELECTED_UNIT_ROOMS';

interface ActionTypes {
  SET_ALL_ROOMS: any;
  SET_ALL_ROOMS_WITH_PHOTOS: any;
  SET_UNIT_ROOMS_WITH_PHOTOS: any;
  SET_SELECTED_ROOM_ID: any;
  SET_ALBUMS: any;
  SET_PHOTOS: any;
  SET_ROOMS_ALBUMS_PHOTOS: any;
  SET_ROOM_LEVEL: any;
  FETCHING_ROOMS: boolean;
  FETCHING_ALBUMS: boolean;
  PHOTO_CREATED: boolean;
  ROOM_LEVEL_UPDATED: boolean;
  SELECTED_UNIT_ROOMS: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type setRoomsActionTypes = MessageAction;

export const listAlbums =
  () =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api['get']('albums'), FORM_ERRORS, FETCHING_ALBUMS);

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: SET_ALBUMS,
        payload: data,
      });
    }
  };

export const listRoomAlbums =
  (roomId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api['get'](`rooms/${roomId}/photos`, { params: { include: 'albums' } })
    );

    if (response?.data) {
      dispatch({
        type: SET_ALBUMS,
        payload: response,
      });
    }
  };

export const listRoomPhotosPerAlbum =
  (roomId: string, albumId: string, pageNumber = 1, setInternally = false) =>
  async (dispatch: any, _getState = null, utils: any) => {
    if (setInternally) {
      const response = await handleApiRequest(
        dispatch,
        utils.Api['get'](`rooms/${roomId}/photos?filter[album]=${albumId}`, {
          params: {
            include: 'photo',
            limit: 20,
            page: pageNumber,
          },
        })
      );

      if (response?.data) {
        const { data, meta } = response;
        const { total } = meta;

        // set photos for add locations screen
        dispatch(setRoomAlbumPhotos(roomId, albumId, total, data));
      }
    }

    return await handleApiRequest(
      dispatch,
      utils.Api['get'](`rooms/${roomId}/photos?filter[album]=${albumId}`, {
        params: {
          include: 'photo',
          limit: 20,
          page: pageNumber,
        },
      })
    );
  };

export const updateRoomLevel =
  (roomId: number, levelId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const { data } = await handleApiRequest(
      dispatch,
      utils.Api['put'](`/rooms/${roomId}`, {
        level_id: levelId,
      })
    );

    if (data) {
      dispatch({
        type: SET_ROOM_LEVEL,
        payload: data,
      });

      dispatch(setRoomLevelUpdate(true));
    }
  };

/*
 * NON API THUNKS
 * */

export const setSelectedRoomId = (roomId: number) => async (dispatch: any) => {
  dispatch({
    type: SET_SELECTED_ROOM_ID,
    payload: roomId,
  });
};

export const setPhotoCreated = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: PHOTO_CREATED,
    payload: value,
  });
};

export const setRoomLevelUpdate = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: ROOM_LEVEL_UPDATED,
    payload: value,
  });
};

export const setSelectedUnitRooms = (data: any) => async (dispatch: any) => {
  dispatch({
    type: SELECTED_UNIT_ROOMS,
    payload: data,
  });
};

export const setRoomAlbumPhotos =
  (roomId: string, albumId: string, total: number, data: any) => async (dispatch: any) => {
    dispatch({
      type: SET_ROOMS_ALBUMS_PHOTOS,
      payload: {
        roomId,
        albumId,
        total,
        photos: data,
      },
    });
  };
