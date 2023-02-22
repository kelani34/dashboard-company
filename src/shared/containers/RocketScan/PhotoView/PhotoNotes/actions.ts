import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';
import { NotesModel } from 'Containers/Notes';

export const PHOTO_NOTES = 'PHOTO_NOTES';
export const PHOTO_NOTE_CREATED = 'PHOTO_NOTE_CREATED';
export const FETCHING_PHOTO_NOTES = 'FETCHING_PHOTO_NOTES';
export const PHOTO_NOTE_CREATE_ERRORS = 'PHOTO_NOTE_CREATE_ERRORS';

interface ActionTypes {
  PHOTO_NOTES: Array<NotesModel>;
  PHOTO_NOTE_CREATED: boolean;
  FETCHING_PHOTO_NOTES: boolean;
  PHOTO_NOTE_CREATE_ERRORS: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type photoNotes = MessageAction;

/*
 * NON API THUNKS
 * */
export const setPhotoNoteCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: PHOTO_NOTE_CREATED,
    payload: value,
  });
};

/*
 * API THUNKS
 * */
/* eslint-disable */

export const createPhotoNote =
  (photoId: number, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`photos/${photoId}/notes`, requestData),
      PHOTO_NOTE_CREATE_ERRORS
    );

    if (response?.data) {
      dispatch(setPhotoNoteCreated(true));
    }
  };

export const listPhotoNotes =
  (photoId: number, page = 1) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`photos/${photoId}/notes`, {
        params: {
          include: 'author',
          sort: 'created_at',
          page,
        },
      }),
      FORM_ERRORS,
      FETCHING_PHOTO_NOTES
    );

    if (response?.data) {
      const { data } = response;
      dispatch({
        type: PHOTO_NOTES,
        payload: data,
      });
    }
  };
