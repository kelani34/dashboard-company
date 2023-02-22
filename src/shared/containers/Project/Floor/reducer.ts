import {
  SET_FLOOR_ROOMS,
  SET_FLOOR_ROOMS_WITH_PHOTOS,
  SET_FLOORS,
  SET_SELECTED_FLOOR,
  setFloorActionTypes,
} from "Containers/Project/Floor/actions";

const initialState = {
  selectedFloor: {},
  rooms: [],
  floors: [],
  floorRoomsWithPhotos: [],
};

export const floorReducer = (state = initialState, action: setFloorActionTypes) => {
  switch (action.type) {
    case SET_SELECTED_FLOOR:
      return {
        ...state,
        selectedFloor: action.payload,
      };
    case SET_FLOOR_ROOMS:
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      };
    case SET_FLOORS:
      return {
        ...state,
        floors: action.payload,
      };
    case SET_FLOOR_ROOMS_WITH_PHOTOS: {
      const { floorId, rooms } = action.payload;

      const existingFloorRooms = state.floorRoomsWithPhotos;

      let newFloorRooms = [];

      // // find the existing unit and assign new rooms
      if (existingFloorRooms.find((floorRoom: any) => floorRoom.floorId === floorId)) {
        existingFloorRooms.find((floorRoom: any) => floorRoom.floorId === floorId).rooms = rooms;
        newFloorRooms = existingFloorRooms;
      } else {
        newFloorRooms = [...state.floorRoomsWithPhotos, action.payload];
      }

      return {
        ...state,
        floorRoomsWithPhotos: newFloorRooms,
      };
    }
    default:
      return state;
  }
};
