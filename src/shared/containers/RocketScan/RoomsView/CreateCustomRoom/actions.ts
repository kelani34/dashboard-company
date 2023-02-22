import { handleApiRequest } from 'Utils/handleApiRequest';
import { listRoomTypes } from 'Containers/RocketScan/actions';

export const CUSTOM_ROOM_CREATED = 'CUSTOM_ROOM_CREATED';
export const CUSTOM_ROOM_UPDATED = 'CUSTOM_ROOM_UPDATED';
export const CUSTOM_ROOM_DELETED = 'CUSTOM_ROOM_DELETED';

interface ActionTypes {
  CUSTOM_ROOM_CREATED: boolean;
  CUSTOM_ROOM_UPDATED: boolean;
  CUSTOM_ROOM_DELETED: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type customRoomTypes = MessageAction;

/*
 * NON API THUNKS, NOT ASYNC
 * */

export const setCustomRoomCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: CUSTOM_ROOM_CREATED,
    payload: value,
  });
};

export const setCustomRoomUpdated = (value: boolean) => (dispatch) => {
  dispatch({
    type: CUSTOM_ROOM_UPDATED,
    payload: value,
  });
};

export const setCustomRoomDeleted = (value: boolean) => (dispatch) => {
  dispatch({
    type: CUSTOM_ROOM_DELETED,
    payload: value,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */

export const createCustomRoom =
  (propertyId: number, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`properties/${propertyId}/room-types`, requestData)
    );

    if (response?.data) {
      const {
        data: { type },
      } = response;

      dispatch(listRoomTypes(propertyId, type));
      dispatch(setCustomRoomCreated(true));
    }
  };

export const updateCustomRoom =
  (propertyId: number, roomTypeId: number, requestData: any, disableEditMode: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.put(`room-types/${roomTypeId}`, requestData));

    if (response?.data) {
      // this is to fetch the room types list
      const {
        data: { type },
      } = response;
      dispatch(listRoomTypes(propertyId, type));
      dispatch(setCustomRoomUpdated(true));
      // disable edit mode on individual container
      setTimeout(() => disableEditMode(), 1000);
    }
  };

export const deleteCustomRoom =
  (propertyId: number, roomTypeId: number, roomType: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.delete(`room-types/${roomTypeId}`));

    if (typeof response === 'string') {
      dispatch(listRoomTypes(propertyId, roomType));
      dispatch(setCustomRoomDeleted(true));
    }
  };
