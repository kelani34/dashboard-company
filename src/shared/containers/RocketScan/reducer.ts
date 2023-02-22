import { addOrRemoveFromArray } from 'Utils/helpers';
import {
  SET_PROJECT_ID,
  SET_PROJECT_COMPANY_ID,
  SET_LOCATION_ID,
  SET_PHOTO_ID,
  SET_SELECTED_TAB,
  SET_PROPERTY,
  FETCHING_PROJECT,
  SET_PROJECT_ADDRESS,
  SET_PROJECT,
  SET_PROJECT_STATUS,
  SET_PROJECT_ADDRESS_OBJECT,
  SET_PROJECT_ALIAS,
  SET_PROJECT_HAS_NEW_DAMAGE_TYPES,
  SET_PROJECT_TYPES,
  SET_PROPERTY_TYPES,
  SET_ROOM_TYPES,
  SET_SELECTED_PHOTO_FILTER,
  SET_ALBUM_TYPES,
  SET_DEFAULT_ROOM_LEVEL_ID,
  SET_DEFAULT_EXTERIOR_LEVEL_ID,
  FETCHING_LOCATIONS,
  SET_UNIT_ROOM_TYPES,
  SET_COMMERCIAL_ROOM_TYPES,
  SET_FLOOR_ROOM_TYPES,
  SET_EXTERIOR_LOCATION_ROOM_TYPES,
  SET_SINGLE_UNIT_EXTERIOR_ROOM_TYPES,
  SET_MULTI_UNIT_EXTERIOR_ROOM_TYPES,
  SET_EXTERIOR_ROOM_TYPES,
  SET_LEVEL_TYPES,
  SET_EXTERIOR_LEVEL_TYPES,
  rocketScanActionTypes,
  SET_SINGLE_LOCATION_ROOM_TYPES,
  SET_INDUSTRIAL_ROOM_TYPES,
  SET_INDUSTRIAL_ROOM_LEVELS,
  SET_DAMAGE_TYPES,
  SET_CATEGORIES,
  SET_DAMAGED_MATERIALS,
  SET_SELECTED_CATEGORIES,
  SET_PROJECT_UNAVAILABLE,
  SET_UNIT_OF_MEASUREMENT_TYPES,
  SET_SCOPE_ACTION_TYPES,
} from './actions';

const initialState = {
  projectId: undefined,
  projectCompanyId: undefined,
  locationId: undefined,
  photoId: undefined,
  selectedTab: undefined,
  projectAddress: undefined,
  project: undefined,
  projectTypes: undefined,
  projectAlias: undefined,
  projectHasNewDamageTypes: true, // by default assume has new damage types
  property: undefined, // to hold property data, new or existing
  propertyTypes: undefined, // to hold property data, new or existing
  roomTypes: undefined,
  selectedPhotoFilter: undefined,
  albumTypes: undefined,
  fetchingProject: true,
  defaultRoomLevelId: undefined,
  defaultExteriorLevelId: undefined,
  fetchingLocations: true,
  fetchingRooms: true,
  unitRoomTypes: [],
  commercialRoomTypes: [],
  floorRoomTypes: [],
  exteriorLocationRoomTypes: [],
  singleUnitExteriorRoomTypes: [],
  multiUnitExteriorRoomTypes: [],
  exteriorRoomTypes: [],
  levels: [],
  exteriorLevels: [],
  singleLocationRoomType: {},
  industrialRoomTypes: [],
  industrialRoomLevels: [],
  damageTypes: [],
  damagedMaterials: [],
  categories: [],
  selectedCategories: [],
  projectUnavailable: false,
  unitOfMeasurementTypes: [],
  scopeActionTypes: [],
};

export const RocketScanReducer = (state = initialState, action: rocketScanActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PROJECT_ID:
      return {
        ...state,
        projectId: payload,
      };
    case SET_PROJECT_COMPANY_ID:
      return {
        ...state,
        projectCompanyId: payload,
      };
    case SET_LOCATION_ID:
      return {
        ...state,
        locationId: payload,
      };
    case SET_PHOTO_ID:
      return {
        ...state,
        photoId: payload,
      };
    case SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: payload,
      };
    case SET_PROJECT_ADDRESS:
      return {
        ...state,
        projectAddress: payload,
      };
    case SET_PROJECT:
      return {
        ...state,
        project: payload,
      };
    case SET_PROJECT_STATUS:
      return {
        ...state,
        project: {
          ...state.project,
          projectStatus: payload,
        },
      };
    case SET_PROJECT_ADDRESS_OBJECT:
      return {
        ...state,
        project: {
          ...state.project,
          address: payload,
        },
      };
    case SET_PROJECT_ALIAS:
      return {
        ...state,
        projectAlias: payload,
      };
    case SET_PROJECT_HAS_NEW_DAMAGE_TYPES:
      return {
        ...state,
        projectHasNewDamageTypes: payload,
      };
    case SET_PROJECT_TYPES:
      return {
        ...state,
        projectTypes: payload,
      };
    case SET_PROPERTY:
      return {
        ...state,
        property: payload,
      };
    case SET_PROPERTY_TYPES:
      return {
        ...state,
        propertyTypes: payload,
      };
    case SET_ROOM_TYPES:
      return {
        ...state,
        roomTypes: payload,
      };
    case SET_SELECTED_PHOTO_FILTER:
      return {
        ...state,
        selectedPhotoFilter: payload,
      };
    case SET_ALBUM_TYPES:
      return {
        ...state,
        albumTypes: payload,
      };
    case FETCHING_PROJECT:
      return {
        ...state,
        fetchingProject: payload,
      };
    case SET_DEFAULT_ROOM_LEVEL_ID:
      return {
        ...state,
        defaultRoomLevelId: payload,
      };
    case SET_DEFAULT_EXTERIOR_LEVEL_ID:
      return {
        ...state,
        defaultExteriorLevelId: payload,
      };
    case FETCHING_LOCATIONS:
      return {
        ...state,
        fetchingLocations: payload,
      };
    case SET_UNIT_ROOM_TYPES:
      return {
        ...state,
        unitRoomTypes: payload,
      };
    case SET_COMMERCIAL_ROOM_TYPES:
      return {
        ...state,
        commercialRoomTypes: payload,
      };
    case SET_EXTERIOR_LOCATION_ROOM_TYPES:
      return {
        ...state,
        exteriorLocationRoomTypes: payload,
      };
    case SET_SINGLE_UNIT_EXTERIOR_ROOM_TYPES:
      return {
        ...state,
        singleUnitExteriorRoomTypes: payload,
      };
    case SET_MULTI_UNIT_EXTERIOR_ROOM_TYPES:
      return {
        ...state,
        multiUnitExteriorRoomTypes: payload,
      };
    case SET_EXTERIOR_ROOM_TYPES:
      return {
        ...state,
        exteriorRoomTypes: payload,
      };
    case SET_FLOOR_ROOM_TYPES:
      return {
        ...state,
        floorRoomTypes: payload,
      };
    case SET_SINGLE_LOCATION_ROOM_TYPES:
      return {
        ...state,
        singleLocationRoomType: payload,
      };
    case SET_INDUSTRIAL_ROOM_TYPES:
      return {
        ...state,
        industrialRoomTypes: payload,
      };
    case SET_LEVEL_TYPES:
      return {
        ...state,
        levels: payload,
      };
    case SET_EXTERIOR_LEVEL_TYPES:
      return {
        ...state,
        exteriorLevels: payload,
      };
    case SET_INDUSTRIAL_ROOM_LEVELS:
      return {
        ...state,
        industrialRoomLevels: payload,
      };
    case SET_DAMAGE_TYPES:
      return {
        ...state,
        damageTypes: payload,
      };
    case SET_DAMAGED_MATERIALS:
      return {
        ...state,
        damagedMaterials: payload,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case SET_SELECTED_CATEGORIES:
      const prevCategories = state.selectedCategories;
      let selectedCategories = [];

      if (payload > 0) {
        if (prevCategories.length === 0) {
          selectedCategories = [payload];
        } else {
          selectedCategories = addOrRemoveFromArray(prevCategories, payload);
        }
      }
      return {
        ...state,
        selectedCategories,
      };
    case SET_PROJECT_UNAVAILABLE:
      return {
        ...state,
        projectUnavailable: payload,
      };
    case SET_UNIT_OF_MEASUREMENT_TYPES:
      return {
        ...state,
        unitOfMeasurementTypes: payload,
      };
    case SET_SCOPE_ACTION_TYPES:
      return {
        ...state,
        scopeActionTypes: payload,
      };
    default:
      return state;
  }
};
