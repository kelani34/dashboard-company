import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';
import { setSelectedRooms } from 'Containers/RocketScan/Header/ActionsCenter/actions';

export const SET_LOCATION_ROOMS = 'SET_LOCATION_ROOMS';
export const FETCHING_LOCATION_ROOMS = 'FETCHING_LOCATION_ROOMS';
export const ROOM_LEVEL_UPDATED = 'ROOM_LEVEL_UPDATED';
export const ROOM_CREATED = 'ROOM_CREATED';
export const ROOM_DELETED = 'ROOM_DELETED';
export const SET_ROOM_BUTTONS_AND_ROOMS = 'SET_ROOM_BUTTONS_AND_ROOMS';
export const CLEAR_ROOM_BUTTONS_AND_ROOMS = 'CLEAR_ROOM_BUTTONS_AND_ROOMS';
export const SET_LEVELS_FOR_BUTTONS = 'SET_LEVELS_FOR_BUTTONS';
export const UPLOADING_ALBUMS = 'UPLOADING_ALBUMS';

interface ActionTypes {
  SET_LOCATION_ROOMS: any[];
  FETCHING_LOCATION_ROOMS: boolean;
  ROOM_LEVEL_UPDATED: boolean;
  ROOM_CREATED: boolean;
  ROOM_DELETED: boolean;
  SET_ROOM_BUTTONS_AND_ROOMS: any[];
  SET_LEVELS_FOR_BUTTONS: any[];
  CLEAR_ROOM_BUTTONS_AND_ROOMS: any;
  UPLOADING_ALBUMS: any[];
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type roomsActionTypes = MessageAction;

/*
 * NON API THUNKS, NON ASYNC
 * */

export const clearRooms = () => (dispatch) => {
  dispatch({
    type: SET_LOCATION_ROOMS,
    payload: undefined,
  });
};

export const setFetchingLocationRooms = (value: boolean) => (dispatch) => {
  dispatch({
    type: FETCHING_LOCATION_ROOMS,
    payload: value,
  });
};

export const setRoomLevelUpdated = (value: boolean) => (dispatch) => {
  dispatch({
    type: ROOM_LEVEL_UPDATED,
    payload: value,
  });
};

export const setRoomCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: ROOM_CREATED,
    payload: value,
  });
};

export const setRoomDeleted = (value: boolean) => (dispatch) => {
  dispatch({
    type: ROOM_DELETED,
    payload: value,
  });
};

export const setLevelForButtons = (levels: any[]) => (dispatch) => {
  const values = levels.map(({ name }: any) => name);

  dispatch({
    type: SET_LEVELS_FOR_BUTTONS,
    payload: values,
  });
};

export const setRoomObject = (roomsData: any) => (dispatch) => {
  dispatch({
    type: SET_ROOM_BUTTONS_AND_ROOMS,
    payload: roomsData,
  });
};

export const clearRoomsObject = () => (dispatch) => {
  dispatch({
    type: CLEAR_ROOM_BUTTONS_AND_ROOMS,
  });
};

export const setUploadingAlbums = (payload: any) => (dispatch: any) => {
  dispatch({
    type: UPLOADING_ALBUMS,
    payload,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */

// get a location's rooms. used in rooms view in RocketScan to display rooms and room buttons.
export const listLocationRooms =
  (locationId: number, pageNumber = 1) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`/locations/${locationId}/rooms`, {
        params: {
          include: 'roomType,level,photos_count,photoAlbums,photos',
          sort: 'level_id',
          page: pageNumber,
        },
      }),
      '',
      FETCHING_LOCATION_ROOMS
    );

    if (response?.data) {
      dispatch({
        type: SET_LOCATION_ROOMS,
        payload: {
          ...response,
          pageNumber,
        },
      });
    }
  };

export const listLocationRoomsForPhotoSelect =
  (locationId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    if (locationId) {
      dispatch(setSelectedRooms({}));

      const response = await handleApiRequest(
        dispatch,
        utils.Api.get(`/locations/${locationId}/rooms`, {
          params: {
            include: 'photos_count,photos',
            sort: 'level_id',
          },
        })
      );

      if (response?.data) {
        const { data: rooms } = response;

        if (rooms.length > 0) {
          rooms.forEach((room: any) => {
            const { id, photos, photos_count: photosCount } = room;

            dispatch(
              setSelectedRooms({
                id,
                photos,
                photosCount,
              })
            );
          });
        } else {
          dispatch(setSelectedRooms({}));
        }
      }
    }
  };

// create new room for floor or unit in rooms view
export const createRoom =
  (locationId: number, roomTypeId: number, levelId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`/locations/${locationId}/rooms`, {
        room_type_id: roomTypeId,
        level_id: levelId,
      }),
      FORM_ERRORS
    );

    if (response?.data) {
      dispatch(setRoomCreated(true));
    }
  };

export const updateRoomLevel =
  (roomId: number, levelId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api['put'](`/rooms/${roomId}`, {
        level_id: levelId,
      })
    );

    if (response?.data) {
      dispatch(setRoomLevelUpdated(true));
    }
  };

export const deleteRoom =
  (roomId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.delete(`rooms/${roomId}`));

    if (typeof response === 'string') {
      dispatch(setRoomDeleted(true));
    }
  };
