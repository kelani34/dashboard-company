import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';

export const GET_PHOTO_SHARE_FULL = 'GET_PHOTO_SHARE_FULL';
export const GET_PHOTO_SHARE_UNITS = 'GET_PHOTO_SHARE_UNITS';
export const GET_PHOTO_SHARE_UNIT_ROOMS = 'GET_PHOTO_SHARE_UNIT_ROOMS';
export const GET_PHOTO_SHARE_FLOORS = 'GET_PHOTO_SHARE_FLOORS';
export const GET_PHOTO_SHARE_FLOOR_ROOMS = 'GET_PHOTO_SHARE_FLOOR_ROOMS';
export const SET_PHOTO_SHARE_ERROR = 'SET_PHOTO_SHARE_ERROR';
export const SET_SHARE_UUID = 'SET_SHARE_UUID';
export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';
export const FETCHING_ROOM_PHOTOS = 'FETCHING_ROOM_PHOTOS';
export const FETCHING_INFO = 'FETCHING_INFO';
export const SET_PHOTO_SHARE_PROPERTY_TYPE = 'SET_PHOTO_SHARE_PROPERTY_TYPE';
export const SET_PHOTO_SHARE_UNIT_TYPE = 'SET_PHOTO_SHARE_UNIT_TYPE';
export const SET_PROJECT_ALBUMS = 'SET_PROJECT_ALBUMS';

interface ActionTypes {
  GET_PHOTO_SHARE_BASIC: object;
  GET_PHOTO_SHARE_FULL: object;
  GET_PHOTO_SHARE_UNITS: object;
  GET_PHOTO_SHARE_UNIT_ROOMS: object;
  GET_PHOTO_SHARE_FLOORS: object;
  GET_PHOTO_SHARE_FLOOR_ROOMS: object;
  SET_PHOTO_SHARE_ERROR: boolean;
  SET_SHARE_UUID: string;
  SET_SELECTED_TAB: string;
  FETCHING_ROOM_PHOTOS: boolean;
  FETCHING_INFO: boolean;
  SET_PHOTO_SHARE_PROPERTY_TYPE: string;
  SET_PHOTO_SHARE_UNIT_TYPE: string;
  SET_PROJECT_ALBUMS: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type photoShareActionTypes = MessageAction;

/*
 * Non API thunks
 * */
export const setShareUuid = (uuid: string) => (dispatch) => {
  dispatch({
    type: SET_SHARE_UUID,
    payload: uuid,
  });
};

export const setSelectedTab = (selected: string) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_TAB,
    payload: selected,
  });
};

/* eslint-disable */
export const getPhotoShareInfo =
  (uuid: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`photo-share/${uuid}`),
      SET_PHOTO_SHARE_ERROR,
      FETCHING_INFO
    );

    if (response?.data) {
      const { data } = response;

      // set full info
      dispatch({
        type: GET_PHOTO_SHARE_FULL,
        payload: data,
      });

      // set property type
      dispatch({
        type: SET_PHOTO_SHARE_PROPERTY_TYPE,
        payload: data,
      });

      // set unit type: units or floors
      dispatch({
        type: SET_PHOTO_SHARE_UNIT_TYPE,
        payload: data,
      });
    }
  };

export const getPhotoShareUnits =
  (uuid: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`photo-share/${uuid}/all-locations`));

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: GET_PHOTO_SHARE_UNITS,
        payload: data,
      });
    }
  };

export const getPhotoShareUnitRooms =
  (uuid: string, unitId: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`/photo-share/${uuid}/locations/${unitId}/rooms`, {
        params: {
          include: 'roomType,level,photos,thumbnail,photosCount',
          limit: 30,
          sort: 'level_id',
        },
      })
    );

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: GET_PHOTO_SHARE_UNIT_ROOMS,
        payload: {
          unitId,
          rooms: data,
        },
      });
    }
  };

export const getPhotoShareFloors =
  (uuid: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`photo-share/${uuid}/all-locations`, {
        params: {
          include: 'locationType',
          sort: '-floor_number,location_type',
        },
      })
    );

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: GET_PHOTO_SHARE_FLOORS,
        payload: data,
      });
    }
  };

export const getPhotoShareFloorRooms =
  (uuid: string, floorId: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`photo-share/${uuid}/locations/${floorId}/rooms`, {
        params: { include: 'roomType' },
      })
    );

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: GET_PHOTO_SHARE_FLOOR_ROOMS,
        payload: {
          floorId,
          rooms: data,
        },
      });
    }
  };

export const listRoomPhotosPerAlbum =
  (uuid: string, roomId: string, albumId: string, pageNumber = 1) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`photo-share/${uuid}/rooms/${roomId}/photos?filter[album]=${albumId}`, {
        params: {
          include: 'photo',
          limit: 10,
          page: pageNumber,
        },
      }),
      FORM_ERRORS,
      FETCHING_ROOM_PHOTOS
    );
  };

// TODO:: to be called in photoshareprovider
export const listProjectAlbums =
  (projectId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`projects/${projectId}/albums`));

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch({
        type: SET_PROJECT_ALBUMS,
        payload: data,
      });
    }
  };
