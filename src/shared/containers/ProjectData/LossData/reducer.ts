import {
  LossDataActionTypes,
  SET_PROJECT_DAMAGE_TYPES,
  SET_PROPERTY_LOCATIONS,
  FETCHING_LOCATIONS,
  SET_PROPERTY_DAMAGE_TYPES,
  CUSTOM_DAMAGE_TYPE_CREATED,
  SET_PROJECT_DAMAGE_CAUSES,
  PROPERTY_LOSS_DATA_UPDATED,
  SET_AFFECTED_LOCATION_ROOMS,
  AFFECTED_LOCATION_UPDATED,
  ROOM_SOURCE_STATUS_UPDATED,
  SET_LOCATION_DAMAGE_TYPES,
} from './actions';

const initialState = {
  locations: [],
  projectDamageTypes: [],
  fetchingLocations: true,
  propertyDamageTypes: [],
  customDamageTypeCreated: false,
  projectDamageCauses: [],
  propertyLossDataUpdated: false,
  affectedLocationRooms: [],
  affectedLocationUpdated: false,
  roomSourceStatusUpdated: false,
  locationDamageTypes: [],
};

export const lossDataReducer = (state = initialState, action: LossDataActionTypes) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PROJECT_DAMAGE_TYPES:
      return {
        ...state,
        projectDamageTypes: payload,
      };
    case SET_PROPERTY_LOCATIONS:
      return {
        ...state,
        locations: payload,
      };
    case FETCHING_LOCATIONS:
      return {
        ...state,
        fetchingLocations: payload,
      };
    case SET_PROPERTY_DAMAGE_TYPES:
      return {
        ...state,
        propertyDamageTypes: payload,
      };
    case CUSTOM_DAMAGE_TYPE_CREATED:
      return {
        ...state,
        customDamageTypeCreated: payload,
      };
    case SET_PROJECT_DAMAGE_CAUSES:
      return {
        ...state,
        projectDamageCauses: payload,
      };
    case PROPERTY_LOSS_DATA_UPDATED:
      return {
        ...state,
        propertyLossDataUpdated: payload,
      };
    case SET_AFFECTED_LOCATION_ROOMS: {
      const roomNames = payload.map((room) => ({
        id: room.id,
        name: room.room_type.name,
      }));
      return {
        ...state,
        affectedLocationRooms: roomNames,
      };
    }
    case AFFECTED_LOCATION_UPDATED:
      return {
        ...state,
        affectedLocationUpdated: payload,
      };
    case ROOM_SOURCE_STATUS_UPDATED:
      return {
        ...state,
        roomSourceStatusUpdated: payload,
      };
    case SET_LOCATION_DAMAGE_TYPES:
      return {
        ...state,
        locationDamageTypes: payload,
      };
    default:
      return state;
  }
};
