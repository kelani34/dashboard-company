import { SET_ROOM_TYPES, UNSET_ROOM_TYPES, SetRoomActionTypes } from "./actions";

const initialState = {
  roomTypes: [],
  rooms: [],
};

export const projectRoomsReducer = (state = initialState, action: SetRoomActionTypes) => {
  switch (action.type) {
    case SET_ROOM_TYPES:
      return {
        ...state,
        roomTypes: action.payload,
      };
    case UNSET_ROOM_TYPES:
      return {
        ...state,
        roomTypes: [],
      };
    default:
      return state;
  }
};
