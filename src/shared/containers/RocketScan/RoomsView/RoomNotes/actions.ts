import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';

export const ROOM_NOTE_CREATE_ERRORS = 'ROOM_NOTE_CREATE_ERRORS';

interface ActionTypes {
  ROOM_NOTE_CREATE_ERRORS: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type roomsNotesActionTypes = MessageAction;

/*
 * API THUNKS
 * */

/* eslint-disable */

export const createRoomNote =
  (roomId: number, requestData: any, onNoteCreated: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`rooms/${roomId}/notes`, requestData),
      ROOM_NOTE_CREATE_ERRORS
    );

    if (response?.data) {
      onNoteCreated();
    }
  };

export const listRoomNotes =
  (roomId: number, page = 1, category: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const params = {
      include: 'author',
      sort: '-created_at',
      limit: 2,
      'filter[category]': category,
      page,
    };
    if (!category) delete params['filter[category]'];
    return await handleApiRequest(dispatch, utils.Api.get(`rooms/${roomId}/notes`, { params }), FORM_ERRORS);
  };
