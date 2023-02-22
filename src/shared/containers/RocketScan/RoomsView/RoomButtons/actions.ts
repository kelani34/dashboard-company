import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';

export const SET_ROOM_BUTTONS = 'SET_ROOM_BUTTONS';
export const FETCHING_ROOM_BUTTONS = 'FETCHING_ROOM_BUTTONS';
export const SET_SELECTED_ROOM = 'SET_SELECTED_ROOM';
export const SET_ROOM_LEVELS = 'SET_ROOM_LEVELS';

interface ActionTypes {
  SET_ROOM_BUTTONS: any;
  FETCHING_ROOM_BUTTONS: boolean;
  SET_SELECTED_ROOM: number;
  SET_ROOM_LEVELS: any[];
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type roomButtonsActionTypes = MessageAction;

/*
 * NON API THUNKS, NON ASYNC
 * */

export const setFetchingRoomButtons = (value: boolean) => (dispatch) => {
  dispatch({
    type: FETCHING_ROOM_BUTTONS,
    payload: value,
  });
};

export const setSelectedRoomId = (value: number) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_ROOM,
    payload: value,
  });
};

export const setRoomLevels = (levels: any[]) => (dispatch) => {
  const values = levels.map(({ name }: any) => name);

  dispatch({
    type: SET_ROOM_LEVELS,
    payload: values,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */

// get rooms for room buttons
export const listLocationRoomsForButtons =
  (locationId: number, pageNumber = 1) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`/locations/${locationId}/rooms`, {
        params: {
          include: 'roomType,level',
          sort: 'created_at',
          page: pageNumber,
        },
      }),
      FORM_ERRORS,
      FETCHING_ROOM_BUTTONS
    );

    if (response?.data?.length > 0) {
      dispatch({
        type: SET_ROOM_BUTTONS,
        payload: {
          ...response,
          pageNumber,
        },
      });
    } else {
      dispatch({
        type: SET_ROOM_BUTTONS,
        payload: undefined,
      });
    }
  };
