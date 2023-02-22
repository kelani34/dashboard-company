import { FETCHING_PHOTO_NOTES, PHOTO_NOTE_CREATE_ERRORS, PHOTO_NOTE_CREATED, PHOTO_NOTES, photoNotes } from './actions';

const initialState = {
  photoNotes: [],
  fetchingPhotoNotes: false,
  photoNoteCreated: false,
  formErrors: undefined,
};

export const photoNotesReducer = (state = initialState, action: photoNotes) => {
  const { type, payload } = action;

  switch (type) {
    case PHOTO_NOTE_CREATED:
      return {
        ...state,
        photoNoteCreated: payload,
      };
    case PHOTO_NOTES:
      return {
        ...state,
        photoNotes: payload,
      };
    case FETCHING_PHOTO_NOTES:
      return {
        ...state,
        fetchingPhotoNotes: payload,
      };
    case PHOTO_NOTE_CREATE_ERRORS:
      return {
        ...state,
        formErrors: payload,
      };
    default:
      return state;
  }
};
