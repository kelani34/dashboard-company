import { handleApiRequest } from 'Utils/handleApiRequest';
import { NotesModel } from 'Containers/Notes/Models';

export const PROJECT_NOTES = 'PROJECT_NOTES';
export const FETCHING_PROJECT_NOTES = 'FETCHING_PROJECT_NOTES';
export const PROJECT_NOTE_CREATED = 'PROJECT_NOTE_CREATED';
export const PROJECT_NOTE_FORM_ERRORS = 'PROJECT_NOTE_FORM_ERRORS';

interface ActionTypes {
  PROJECT_NOTES: Array<NotesModel>;
  FETCHING_PROJECT_NOTES: boolean;
  PROJECT_NOTE_CREATED: boolean;
  PROJECT_NOTE_FORM_ERRORS: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type projectNotes = MessageAction;

/*
 * NON API THUNKS
 * */

export const setProjectNoteCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: PROJECT_NOTE_CREATED,
    payload: value,
  });
};

/*
 * API THUNKS
 * */
/* eslint-disable */

/*
 * PROJECT NOTES
 * */

export const listProjectNotes =
  (projectId: number, page = 1) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`projects/${projectId}/notes`, {
        params: {
          include: 'project',
          sort: 'created_at',
          limit: 2,
          page,
        },
      }),
      PROJECT_NOTE_FORM_ERRORS,
      FETCHING_PROJECT_NOTES
    );

    if (response?.data) {
      dispatch({
        type: PROJECT_NOTES,
        payload: {
          ...response,
          page,
        },
      });
    }
  };

export const createProjectNote =
  (projectId: number, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`projects/${projectId}/notes`, requestData),
      PROJECT_NOTE_FORM_ERRORS
    );

    if (response?.data) {
      dispatch(setProjectNoteCreated(true));
    }
  };
