/* eslint-disable */

import { handleApiRequest } from 'Utils/handleApiRequest';
import { setRoomCreated } from 'Containers/Project/Unit/actions';
import { FORM_ERRORS } from 'Containers/Core/actions';
import { FETCHING_ROOMS, setSelectedUnitRooms } from 'Containers/Project/Unit/Rooms/actions';

export const SET_FLOOR_ROOMS = 'SET_FLOOR_ROOMS';
export const SET_SELECTED_FLOOR = 'SET_SELECTED_FLOOR';
export const SET_FLOORS = 'SET_FLOORS';
export const SET_FLOOR_ROOMS_WITH_PHOTOS = 'SET_FLOOR_ROOMS_WITH_PHOTOS';

interface ActionTypes {
  SET_FLOOR_ROOMS: any;
  SET_SELECTED_FLOOR: any;
  SET_FLOORS: any;
  SET_FLOOR_ROOMS_WITH_PHOTOS: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type setFloorActionTypes = MessageAction;

export const createFloorRoom =
  (floorId: number, selectedRoom: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api['post'](`/floors/${floorId}/rooms`, {
        room_type_id: selectedRoom.id,
      })
    );

    if (response?.data) {
      const { data: room } = response;
      //Add the room date to the room.  Remove any white space in the name. Spaces will break the icons
      room.name = selectedRoom.name;
      dispatch({
        type: SET_FLOOR_ROOMS,
        payload: room,
      });

      room.room_type = {};
      room.photos = [];
      room.room_type.name = selectedRoom.name;
      dispatch(setSelectedUnitRooms([room]));

      dispatch(setRoomCreated(room.id));
    }
  };

export const listPropertyWithFloorsAndRooms =
  (propertyId: number, type = 'get') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api[type](`properties/${propertyId}/floors`, {
        params: {
          include: 'rooms,rooms.roomType,rooms.level',
        },
      })
    );

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch({
        type: SET_FLOORS,
        payload: data,
      });
    } else {
      dispatch({
        type: SET_FLOORS,
        payload: [],
      });
    }
  };

export const setFloorRoomsWithPhotos =
  (floorId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api['get'](`floors/${floorId}/rooms?sort=level_id`, {
        params: { include: 'roomType,level,photosCount,photos,thumbnail' },
      }),
      FORM_ERRORS,
      FETCHING_ROOMS
    );

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch({
        type: SET_FLOOR_ROOMS_WITH_PHOTOS,
        payload: {
          floorId,
          rooms: data,
        },
      });
    } else {
      dispatch({
        type: SET_FLOOR_ROOMS_WITH_PHOTOS,
        payload: {
          floorId,
          rooms: [],
        },
      });
    }
  };

/*
 * NON API THUNKS
 * */

export const setSelectedFloor = (floor: any) => async (dispatch) => {
  dispatch({
    type: SET_SELECTED_FLOOR,
    payload: floor,
  });
};
