import {
  locationNotesActionTypes,
  LOCATION_NOTES,
  LOCATION_NOTE_CREATE_ERRORS,
  FETCHING_LOCATION_NOTES,
  LOCATION_NOTE_CREATED,
} from './actions';

const initialState = {
  locationNotes: [], // holds local copy of incoming notes
  totalNotes: 0,
  totalAllNotes: 0,
  currentPage: 1,
  locationNoteCreated: false,
  locationNoteCreateErrors: {},
  fetchingLocationNotes: false,
};

export const locationNotesReducer = (state = initialState, action: locationNotesActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case LOCATION_NOTES: {
      let totalNotesCount = 0;
      let currentPage = 1;
      let localNotes = state.locationNotes;
      let localNotesCount = state.totalNotes;

      if (payload?.data?.length > 0) {
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

        totalNotesCount = total;
        localNotesCount = notes.length;
      } else {
        // location doesn't have any notes
        localNotes = [];
        localNotesCount = 0;
      }

      return {
        ...state,
        locationNotes: localNotes,
        totalNotesCount,
        localNotesCount,
        currentPage,
      };
    }
    case LOCATION_NOTE_CREATED:
      return {
        ...state,
        locationNoteCreated: payload,
      };
    case LOCATION_NOTE_CREATE_ERRORS:
      return {
        ...state,
        locationNoteCreateErrors: payload,
      };
    case FETCHING_LOCATION_NOTES:
      return {
        ...state,
        fetchingLocationNotes: payload,
      };
    default:
      return state;
  }
};
