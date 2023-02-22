import {
  SET_MULTI_UNIT,
  SET_SELECTED_PHOTO_FILTER,
  SET_SINGLE_UNIT,
  SET_UNIT,
  SET_UNITS,
  SET_FLOOR,
  SET_FLOORS,
  setUnitActionTypes,
  UNIT_CREATED,
  FLOOR_CREATED,
  ROOM_CREATED,
  SELECTED_MULTI_UNIT,
} from "Containers/Project/Unit/actions";

const initialState = {
  units: {},
  unit: {},
  singleUnit: {},
  multiUnit: {},
  floors: {},
  floor: {},
  unitCreated: false,
  floorCreated: false,
  roomCreated: false,
  selectedPhotoFilter: "allPhotos",
  fetchingUnits: true,
  selectedMultiUnit: {},
};

export const unitsReducer = (state = initialState, action: setUnitActionTypes) => {
  switch (action.type) {
    case SET_UNITS: {
      if (action.payload.length !== state.units) {
        return {
          ...state,
          units: action.payload,
        };
      }

      return state;
    }
    case SET_UNIT:
      return {
        ...state,
        unit: action.payload,
      };
    case SET_FLOORS:
      return {
        ...state,
        floors: action.payload,
      };
    case SET_FLOOR:
      return {
        ...state,
        floor: action.payload,
      };
    case SET_SINGLE_UNIT:
      return {
        ...state,
        singleUnit: action.payload,
      };
    case UNIT_CREATED:
      return {
        ...state,
        unitCreated: action.payload,
      };
    case FLOOR_CREATED:
      return {
        ...state,
        floorCreated: action.payload,
      };
    case ROOM_CREATED:
      return {
        ...state,
        roomCreated: action.payload,
      };
    case SET_MULTI_UNIT:
      return {
        ...state,
        multiUnit: action.payload,
      };
    case SET_SELECTED_PHOTO_FILTER:
      return {
        ...state,
        selectedPhotoFilter: action.payload,
      };
    case SELECTED_MULTI_UNIT:
      return {
        ...state,
        selectedMultiUnit: action.payload,
      };
    default:
      return state;
  }
};
