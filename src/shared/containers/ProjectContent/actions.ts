/* eslint-disable */

// types
import { handleApiRequest } from "Utils/handleApiRequest";
import { RoomTypeModel } from "./Models/RoomTypeModel";

export const SET_ROOM_TYPES = "SET_ROOM_TYPES";
export const UNSET_ROOM_TYPES = "UNSET_ROOM_TYPES";
export type SetRoomActionTypes = MessageAction;

interface ActionTypes {
  SET_ROOM_TYPES: Array<RoomTypeModel>;
  UNSET_ROOM_TYPES: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export const listRoomTypes =
  (roomType = "unit", type = "get", requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api[type](`room-types?filter[type]=${roomType}`, requestData)
    );
    if (response?.data) {
      const { data } = response;
      dispatch({
        type: SET_ROOM_TYPES,
        payload: data,
      });
    }
  };

/*
 * Non API thunks
 * */

export const clearRoomTypes = () => async (dispatch) => {
  dispatch({
    type: UNSET_ROOM_TYPES,
  });
};
