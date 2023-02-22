import {
  FETCHING_PROJECT_ALL_NOTES,
  notesActionTypes,
  PHOTO_NOTE_EDITED,
  PROJECT_ALL_NOTES,
  TOGGLE_FILTER_BOOKMARKED,
  TOGGLE_FILTER_FLAGGED,
} from 'Containers/Notes/actions';

const initialState = {
  photoNoteEdited: false,
  projectNotes: [],
  projectNotesCurrentPage: 1,
  projectNotesTotal: 0,
  fetchingProjectNotes: false,
  filterBookmarked: false,
  filterFlagged: false,
};

export const notesReducer = (state = initialState, action: notesActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case PHOTO_NOTE_EDITED:
      return {
        ...state,
        photoNoteEdited: payload,
      };
    case FETCHING_PROJECT_ALL_NOTES:
      return {
        ...state,
        fetchingProjectNotes: payload,
      };
    case PROJECT_ALL_NOTES: {
      let projectNotes = state.projectNotes;

      const {
        data: notes,
        meta: { total: projectNotesTotal, current_page: projectNotesCurrentPage },
        page,
      } = payload;

      if (page > state.projectNotesCurrentPage) {
        projectNotes = [...projectNotes, ...notes];
      } else {
        projectNotes = notes;
      }

      return {
        ...state,
        projectNotes,
        projectNotesCurrentPage,
        projectNotesTotal,
      };
    }
    case TOGGLE_FILTER_BOOKMARKED: {
      return {
        ...state,
        filterBookmarked: payload,
      };
    }
    case TOGGLE_FILTER_FLAGGED: {
      return {
        ...state,
        filterFlagged: payload,
      };
    }
    default:
      return state;
  }
};
