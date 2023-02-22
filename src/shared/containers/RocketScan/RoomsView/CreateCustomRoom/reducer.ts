import {
  CUSTOM_ROOM_CREATED,
  CUSTOM_ROOM_DELETED,
  CUSTOM_ROOM_UPDATED,
  customRoomTypes,
} from 'Containers/RocketScan/RoomsView/CreateCustomRoom/actions';

const initialState = {
  customRoomCreated: false,
  customRoomUpdated: false,
  customRoomDeleted: false,
};

export const customRoomReducer = (state = initialState, action: customRoomTypes) => {
  const { type, payload } = action;

  switch (type) {
    case CUSTOM_ROOM_CREATED:
      return {
        ...state,
        customRoomCreated: payload,
      };
    case CUSTOM_ROOM_UPDATED:
      return {
        ...state,
        customRoomUpdated: payload,
      };
    case CUSTOM_ROOM_DELETED:
      return {
        ...state,
        customRoomDeleted: payload,
      };
    default:
      return state;
  }
};
