import {
  FETCHING_PROPERTIES,
  FETCHING_UNITS_WITH_ROOMS,
  SET_PROPERTY,
  SET_PROPERTY_SINGLE,
  SET_PROPERTY_TYPE,
  PROJECT_DELETED,
  setProjectActionTypes,
} from 'Containers/Project/actions';

const initialState = {
  property: {},
  propertySingle: {},
  propertyType: undefined,
  fetchingProperties: true,
  fetchingUnitsWithRooms: false,
  projectStatusUpdated: false,
  projectDeleted: false,
};

export const projectReducer = (state = initialState, action: setProjectActionTypes) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PROPERTY:
      return {
        ...state,
        property: payload,
      };
    case SET_PROPERTY_SINGLE:
      return {
        ...state,
        propertySingle: payload,
      };
    case SET_PROPERTY_TYPE:
      return {
        ...state,
        propertyType: payload,
      };
    case FETCHING_PROPERTIES:
      return {
        ...state,
        fetchingProperties: payload,
      };
    case FETCHING_UNITS_WITH_ROOMS:
      return {
        ...state,
        fetchingUnitsWithRooms: payload,
      };
    case PROJECT_DELETED:
      return {
        ...state,
        projectDeleted: payload,
      };
    default:
      return state;
  }
};
