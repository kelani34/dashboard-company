import { handleApiRequest } from 'Utils/handleApiRequest';

export const CUSTOM_LEVEL_CREATED = 'CUSTOM_LEVEL_CREATED';
export const CUSTOM_LEVEL_UPDATED = 'CUSTOM_LEVEL_UPDATED';
export const CUSTOM_LEVEL_DELETED = 'CUSTOM_LEVEL_DELETED';
export const CREATE_CUSTOM_LEVEL_ERRORS = 'CREATE_CUSTOM_LEVEL_ERRORS';
export const EDIT_CUSTOM_LEVEL_ERRORS = 'EDIT_CUSTOM_LEVEL_ERRORS';

interface ActionTypes {
  CUSTOM_LEVEL_CREATED: string;
  CUSTOM_LEVEL_UPDATED: string;
  CUSTOM_LEVEL_DELETED: string;
  CREATE_CUSTOM_LEVEL_ERRORS: object;
  EDIT_CUSTOM_LEVEL_ERRORS: object;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type customLevels = MessageAction;

/*
 * NON API THUNKS, NOT ASYNC
 * */

export const setCustomLevelCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: CUSTOM_LEVEL_CREATED,
    payload: value,
  });
};

export const setCustomLevelUpdated = (value: boolean) => (dispatch) => {
  dispatch({
    type: CUSTOM_LEVEL_UPDATED,
    payload: value,
  });
};

export const setCustomLevelDeleted = (value: boolean) => (dispatch) => {
  dispatch({
    type: CUSTOM_LEVEL_DELETED,
    payload: value,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */

export const createCustomLevel =
  (propertyId: number, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`properties/${propertyId}/levels`, requestData),
      CREATE_CUSTOM_LEVEL_ERRORS
    );

    if (response?.data) {
      dispatch(setCustomLevelCreated(true));
    }
  };

export const updateCustomLevel =
  (levelId: number, requestData: any, disableEditMode: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.put(`levels/${levelId}`, requestData),
      EDIT_CUSTOM_LEVEL_ERRORS
    );

    if (response?.data) {
      // this is to fetch the levels list
      dispatch(setCustomLevelUpdated(true));
      // disable edit mode on individual container
      setTimeout(() => disableEditMode(), 1000);
    }
  };

export const deleteCustomLevel =
  (levelId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.delete(`levels/${levelId}`), EDIT_CUSTOM_LEVEL_ERRORS);

    if (typeof response === 'string') {
      dispatch(setCustomLevelDeleted(true));
    }
  };
