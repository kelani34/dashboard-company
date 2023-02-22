import {
  projectNotes,
  PROJECT_NOTES,
  FETCHING_PROJECT_NOTES,
  PROJECT_NOTE_CREATED,
  PROJECT_NOTE_FORM_ERRORS,
} from './actions';

const initialState = {
  projectNotes: [],
  totalNotes: 0,
  totalAllNotes: 0,
  currentPage: 1,
  fetchingProjectNotes: false,
  projectNoteCreated: false,
  formErrors: {},
};

export const projectNotesReducer = (state = initialState, action: projectNotes) => {
  const { type, payload } = action;

  switch (type) {
    case PROJECT_NOTES: {
      let totalAllNotes = 0;
      let currentPage = 1;
      let localNotes = state.projectNotes;
      let totalNotes = state.totalNotes;

      const {
        data: notes,
        meta: { total, current_page: current },
        page,
      } = payload;

      if (page > currentPage) {
        localNotes = [...localNotes, ...notes];
      } else {
        localNotes = notes;
      }

      currentPage = current;

      totalAllNotes = total;
      totalNotes = notes.length;

      return {
        ...state,
        projectNotes: localNotes,
        totalAllNotes,
        totalNotes,
        currentPage,
      };
    }
    case FETCHING_PROJECT_NOTES:
      return {
        ...state,
        fetchingProjectNotes: payload,
      };
    case PROJECT_NOTE_CREATED:
      return {
        ...state,
        projectNoteCreated: payload,
      };
    case PROJECT_NOTE_FORM_ERRORS:
      return {
        ...state,
        formErrors: payload,
      };
    default:
      return state;
  }
};
