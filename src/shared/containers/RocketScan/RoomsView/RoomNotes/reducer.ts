import { ROOM_NOTE_CREATE_ERRORS, roomsNotesActionTypes } from 'Containers/RocketScan/RoomsView/RoomNotes/actions';

const initialState = {
  formErrors: undefined,
};

export const roomNotesReducer = (state = initialState, action: roomsNotesActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case ROOM_NOTE_CREATE_ERRORS:
      return {
        ...state,
        formErrors: payload,
      };
    default:
      return state;
  }
};
