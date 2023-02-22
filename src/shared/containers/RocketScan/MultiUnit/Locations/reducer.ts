import {
  LOCATION_TYPES,
  SET_LOCATION,
  LOCATION_ROOM_CREATED,
  LOCATION_CREATED,
  LOCATION_DELETED,
  locationsActionTypes,
  SET_LOCATIONS,
  FETCHING_LOCATIONS,
  REFRESH_LOCATIONS,
  LOCATION_EDIT_FORM_ERRORS,
  MULTI_UNIT_EXTERIOR_LOCATION_CREATED,
  EXTERIOR_LOCATION,
  LOCATION_CLAIM_CREATED,
  LOCATION_CLAIM_CREATE_ERRORS,
  LOCATION_CLAIMS,
  SET_LOCATION_CLAIM_SELECTED,
} from 'Containers/RocketScan/MultiUnit/Locations/actions';

const initialState = {
  locationTypes: [],
  location: undefined, // to hold immediate created location or selected location from the route change
  locationRoomCreated: false,
  locationCreated: false,
  locationDeleted: false,
  locations: [],
  localLocations: [],
  totalLocations: 0,
  totalAllLocations: 0,
  currentPage: 1,
  lastPage: 1,
  fetchingLocations: true,
  refreshLocations: false,
  formErrors: {},
  exteriorLocation: undefined,
  multiUnitExteriorLocationCreated: undefined,
  locationClaimCreated: false,
  locationClaimCreateErrors: undefined,
  locationClaims: [],
  locationClaim: undefined,
};

export const locationsReducer = (state = initialState, actions: locationsActionTypes) => {
  const { type, payload } = actions;

  switch (type) {
    case LOCATION_TYPES:
      return {
        ...state,
        locationTypes: payload,
      };
    case SET_LOCATION:
      return {
        ...state,
        location: payload,
      };
    case LOCATION_ROOM_CREATED:
      return {
        ...state,
        locationRoomCreated: payload,
      };
    case LOCATION_CREATED:
      return {
        ...state,
        locationCreated: payload,
      };
    case LOCATION_DELETED:
      return {
        ...state,
        locationDeleted: payload,
      };
    case FETCHING_LOCATIONS:
      return {
        ...state,
        fetchingLocations: payload,
      };
    case SET_LOCATIONS: {
      const localLocations = state.locations;
      let locations = [];
      let totalAllLocations = 0;
      let currentPage = 1;
      let lastPage = 1;
      let totalLocations = state.totalLocations;

      if (payload?.data?.length > 0) {
        const {
          data,
          meta: { total, current_page: current, last_page: last },
          pageNumber,
        } = payload;

        if (pageNumber !== currentPage) {
          locations = [...localLocations, ...data];
        } else {
          locations = data;
        }

        currentPage = current;
        lastPage = last;

        totalAllLocations = total;
        totalLocations = data.length;
      }

      return {
        ...state,
        locations,
        totalAllLocations,
        totalLocations,
        currentPage,
        lastPage,
      };
    }
    case REFRESH_LOCATIONS:
      return {
        ...state,
        refreshLocations: payload,
      };
    case LOCATION_EDIT_FORM_ERRORS:
      return {
        ...state,
        formErrors: payload,
      };
    case EXTERIOR_LOCATION:
      return {
        ...state,
        exteriorLocation: payload,
      };
    case MULTI_UNIT_EXTERIOR_LOCATION_CREATED:
      return {
        ...state,
        multiUnitExteriorLocationCreated: payload,
      };
    case LOCATION_CLAIM_CREATED:
      return {
        ...state,
        locationClaimCreated: payload,
      };
    case LOCATION_CLAIM_CREATE_ERRORS:
      return {
        ...state,
        locationClaimCreateErrors: payload,
      };
    case LOCATION_CLAIMS:
      return {
        ...state,
        locationClaims: payload,
      };
    case SET_LOCATION_CLAIM_SELECTED:
      return {
        ...state,
        locationClaim: payload,
      };
    default:
      return state;
  }
};
