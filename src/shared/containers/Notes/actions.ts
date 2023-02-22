import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';
import { NotesModel } from 'Containers/Notes/Models';

// Photo note types
export const PHOTO_NOTE_EDITED = 'PHOTO_NOTE_EDITED';
export const PROJECT_ALL_NOTES = 'PROJECT_ALL_NOTES';

// project notes type
export const FETCHING_PROJECT_ALL_NOTES = 'FETCHING_PROJECT_ALL_NOTES';

// location and location note type
export const FETCHING_LOCATIONS_FOR_NOTES = 'FETCHING_LOCATIONS_FOR_NOTES';

// all notes filter
export const TOGGLE_FILTER_BOOKMARKED = 'TOGGLE_FILTER_BOOKMARKED';
export const TOGGLE_FILTER_FLAGGED = 'TOGGLE_FILTER_FLAGGED';

// TODO:: Room, location, and project note types

interface ActionTypes {
  PHOTO_NOTE_EDITED: boolean;
  PROJECT_ALL_NOTES: Array<NotesModel>;
  FETCHING_PROJECT_ALL_NOTES: boolean;
  FETCHING_LOCATIONS_FOR_NOTES: boolean;
  TOGGLE_FILTER_BOOKMARKED: boolean;
  TOGGLE_FILTER_FLAGGED: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type notesActionTypes = MessageAction;

/*
 * NON-API THUNKS
 * */

export const setNoteEditedGeneral = (type: string, payload: boolean) => (dispatch) => {
  dispatch({
    type,
    payload,
  });
};

export const toggleFilterBookmarked = (state: any) => (dispatch) => {
  dispatch({
    type: TOGGLE_FILTER_BOOKMARKED,
    payload: state,
  });
};

export const toggleFilterFlagged = (state: any) => (dispatch) => {
  dispatch({
    type: TOGGLE_FILTER_FLAGGED,
    payload: state,
  });
};

/*
 * API THUNKS
 * */
/* eslint-disable */

export const editNote =
  (noteId: number, requestData: any, editedType: string, setFetching: any, setNoteEdited: any, setErrors: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    setFetching(true);

    const response = await handleApiRequest(dispatch, utils.Api.put(`notes/${noteId}`, requestData), '', '', setErrors);

    if (response?.data) {
      const { data } = response;

      setNoteEdited(data);
      setFetching(false);
      // to show the toast
      dispatch(setNoteEditedGeneral(editedType, true));
    } else {
      setFetching(false);
    }
  };

export const deleteNote =
  (noteId: number, onNoteDeleted: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.delete(`notes/${noteId}`));

    if (typeof response === 'string') {
      onNoteDeleted();
    }
  };

export const toggleNoteFlag =
  (noteId: number, setNoteEdited: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.put(`notes/${noteId}/toggle-flag`, {}));

    if (response?.data) {
      const { data } = response;

      setNoteEdited(data);
    }
  };

export const toggleNoteBookmark =
  (noteId: number, setNoteEdited: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.put(`notes/${noteId}/toggle-bookmark`, {}));

    if (response?.data) {
      const { data } = response;

      setNoteEdited(data);
    }
  };

/*
 * Project notes
 * */

export const listProjectNotes =
  (projectId: number, page = 1, filterBookmarked = false, filterFlagged = false, searchValue = '') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`projects/${projectId}/notes`, {
        params: {
          include: 'author',
          sort: 'created_at',
          // using false filters for non-bookmarked notes, so this is set to empty when the filter isn't used
          'filter[is_bookmarked]': filterBookmarked ? 1 : '',
          'filter[is_flagged]': filterFlagged ? 1 : '',
          'filter[search]': searchValue,
          limit: 10,
          page,
        },
      }),
      FORM_ERRORS,
      FETCHING_PROJECT_ALL_NOTES
    );

    if (response?.data) {
      dispatch({
        type: PROJECT_ALL_NOTES,
        payload: {
          ...response,
          page,
        },
      });
    }
  };

/*
 * Locations and location notes
 * */

export const listLocationsForNotes =
  (propertyId: number, page = 1, filterBookmarked, filterFlagged, searchValue) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`/properties/${propertyId}/locations`, {
        params: {
          include:
            'locationType,notes,rooms,rooms.roomType,rooms.level,photos_count,rooms_count,notes_count,bookmarked_notes_count,flagged_notes_count,room_notes_count,photo_notes_count',
          sort: '-floor_number,location_type,-name',
          'filter[has_notes]': true,
          'filter[has_bookmarked_notes]': filterBookmarked ? 1 : '',
          'filter[has_flagged_notes]': filterFlagged ? 1 : '',
          'filter[has_notes_containing]': searchValue,
          limit: 2,
          page,
        },
      }),
      '',
      FETCHING_LOCATIONS_FOR_NOTES
    );
  };

export const listLocationNotes =
  (locationId: number, page = 1, filterBookmarked = false, filterFlagged = false, searchValue = '') =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`locations/${locationId}/notes`, {
        params: {
          include: 'author',
          sort: 'created_at',
          // using false filters for non-bookmarked notes, so this is set to empty when the filter isn't used
          'filter[is_bookmarked]': filterBookmarked ? 1 : '',
          'filter[is_flagged]': filterFlagged ? 1 : '',
          'filter[search]': searchValue,
          limit: 10,
          page,
        },
      })
    );
  };

export const listRoomsForNotes =
  (locationId: number, page = 1, filterBookmarked = false, filterFlagged = false, searchValue = '') =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`locations/${locationId}/rooms`, {
        params: {
          include:
            'roomType,level,photos,thumbnail,photoAssemblies,notes,photos_count,notes_count,bookmarked_notes_count,flagged_notes_count,photo_notes_count',
          sort: 'level_id',
          'filter[has_notes]': true,
          'filter[has_bookmarked_notes]': filterBookmarked ? 1 : '',
          'filter[has_flagged_notes]': filterFlagged ? 1 : '',
          'filter[has_notes_containing]': searchValue,
          limit: 10,
          page,
        },
      })
    );
  };

export const listRoomNotes =
  (roomId: number, page = 1, filterBookmarked = false, filterFlagged = false, searchValue = '', category?: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`rooms/${roomId}/notes`, {
        params: {
          include: 'author',
          sort: 'created_at',
          // using false filters for non-bookmarked notes, so this is set to empty when the filter isn't used
          'filter[is_bookmarked]': filterBookmarked ? 1 : '',
          'filter[is_flagged]': filterFlagged ? 1 : '',
          'filter[search]': searchValue,
          'filter[category]': category,
          limit: 10,
          page,
        },
      })
    );
  };

export const listPhotosForNotes =
  (roomId: number, page = 1, filterBookmarked = false, filterFlagged = false, searchValue = '') =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`rooms/${roomId}/photos`, {
        params: {
          include: 'photo,project,albums,notes,notes_count,bookmarked_notes_count,flagged_notes_count',
          sort: 'created_at',
          'filter[has_notes]': true,
          'filter[has_bookmarked_notes]': filterBookmarked ? 1 : '',
          'filter[has_flagged_notes]': filterFlagged ? 1 : '',
          'filter[has_notes_containing]': searchValue,
          limit: 10,
          page,
        },
      })
    );
  };

export const listPhotoNotes =
  (photoId: number, page = 1, filterBookmarked = false, filterFlagged = false, searchValue = '') =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`photos/${photoId}/notes`, {
        params: {
          include: 'author',
          sort: 'created_at',
          // using false filters for non-bookmarked notes, so this is set to empty when the filter isn't used
          'filter[is_bookmarked]': filterBookmarked ? 1 : '',
          'filter[is_flagged]': filterFlagged ? 1 : '',
          'filter[search]': searchValue,
          limit: 10,
          page,
        },
      })
    );
  };
