import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';

export const LOCATION_NOTES = 'LOCATION_NOTES';
export const LOCATION_NOTE_CREATED = 'LOCATION_NOTE_CREATED';
export const LOCATION_NOTE_CREATE_ERRORS = 'LOCATION_NOTE_CREATE_ERRORS';
export const FETCHING_LOCATION_NOTES = 'FETCHING_LOCATION_NOTES';

interface ActionTypes {
  LOCATION_NOTES: any;
  LOCATION_NOTE_CREATED: any;
  LOCATION_NOTE_CREATE_ERRORS: any;
  FETCHING_LOCATION_NOTES: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type locationNotesActionTypes = MessageAction;

/*
 * NON API THUNKS
 * */
export const setLocationNoteCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: LOCATION_NOTE_CREATED,
    payload: value,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */
export const listLocationNotes =
  (locationId: number, page = 1) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`locations/${locationId}/notes`, {
        params: {
          include: 'author',
          sort: 'created_at',
          limit: 2,
          page,
        },
      }),
      FORM_ERRORS,
      FETCHING_LOCATION_NOTES
    );

    if (response?.data) {
      dispatch({
        type: LOCATION_NOTES,
        payload: {
          ...response,
          page,
        },
      });
    }
  };

export const createLocationNote =
  (locationId: number, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`locations/${locationId}/notes`, requestData),
      LOCATION_NOTE_CREATE_ERRORS
    );

    if (response?.data) {
      dispatch(setLocationNoteCreated(true));
    }
  };
