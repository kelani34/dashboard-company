import { convertWordsFirstLetterUppercase, formatDate } from 'Utils/helpers';
import {
  SET_SHARE_UUID,
  GET_PHOTO_SHARE_FULL,
  GET_PHOTO_SHARE_UNITS,
  GET_PHOTO_SHARE_UNIT_ROOMS,
  GET_PHOTO_SHARE_FLOORS,
  GET_PHOTO_SHARE_FLOOR_ROOMS,
  SET_SELECTED_TAB,
  FETCHING_ROOM_PHOTOS,
  photoShareActionTypes,
  FETCHING_INFO,
  SET_PHOTO_SHARE_PROPERTY_TYPE,
  SET_PHOTO_SHARE_UNIT_TYPE,
  SET_PHOTO_SHARE_ERROR,
  SET_PROJECT_ALBUMS,
} from './actions';

const initialState = {
  uuid: '',
  units: [],
  unitRoomsWithPhotos: [],
  floors: [],
  floorRoomsWithPhotos: [],
  info: {
    senderName: '',
    companyName: '',
    projectAddress: '',
    projectUid: undefined,
    shareTime: undefined,
    projectId: undefined,
    albums: [],
  },
  error: false,
  selectedTab: undefined,
  fetchingRoomPhotos: undefined,
  fetchingInfo: undefined,
  propertyType: undefined,
  unitType: undefined,
  projectAlbums: [],
};

export const PhotoShareReducer = (state = initialState, action: photoShareActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SHARE_UUID:
      return {
        ...state,
        uuid: payload,
      };
    case GET_PHOTO_SHARE_FULL: {
      const { creator, project, company, created_at: createdAt } = payload;

      const { full_name: fullName } = creator;
      const { id: projectId, address, uid: projectUid, albums } = project;
      const { address: projectAddress } = address;
      const { name: companyName, phones } = company;
      const shareTime = formatDate(createdAt, 'yyyy-MM-dd');
      const senderName = convertWordsFirstLetterUppercase(fullName);

      return {
        ...state,
        info: {
          senderName,
          phones,
          company,
          companyName,
          projectAddress,
          projectUid,
          shareTime,
          projectId,
          albums,
        },
      };
    }
    case SET_PHOTO_SHARE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_PHOTO_SHARE_UNITS:
      return {
        ...state,
        units: payload,
      };
    case GET_PHOTO_SHARE_UNIT_ROOMS: {
      const { unitId, rooms } = payload;

      const existingUnitRooms = state.unitRoomsWithPhotos;

      let newUnitRooms = [];

      // find the existing unit and assign new rooms
      if (existingUnitRooms.find((unitRoom: any) => unitRoom.unitId === unitId)) {
        existingUnitRooms.find((unitRoom: any) => unitRoom.unitId === unitId).rooms = rooms;
        newUnitRooms = existingUnitRooms;
      } else {
        newUnitRooms = [...state.unitRoomsWithPhotos, payload];
      }

      return {
        ...state,
        unitRoomsWithPhotos: newUnitRooms,
      };
    }
    case GET_PHOTO_SHARE_FLOORS:
      return {
        ...state,
        floors: payload,
      };
    case GET_PHOTO_SHARE_FLOOR_ROOMS: {
      const { floorId, rooms } = payload;

      const existingFloorRooms = state.floorRoomsWithPhotos;

      let newFloorRooms = [];

      if (existingFloorRooms.find((floorRoom: any) => floorRoom.floorId === floorId)) {
        existingFloorRooms.find((floorRoom: any) => floorRoom.floorId === floorId).rooms = rooms;
        newFloorRooms = existingFloorRooms;
      } else {
        newFloorRooms = [...state.floorRoomsWithPhotos, payload];
      }

      return {
        ...state,
        floorRoomsWithPhotos: newFloorRooms,
      };
    }
    case SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: payload,
      };
    case FETCHING_ROOM_PHOTOS:
      return {
        ...state,
        fetchingRoomPhotos: payload,
      };
    case FETCHING_INFO:
      return {
        ...state,
        fetchingInfo: payload,
      };
    case SET_PHOTO_SHARE_PROPERTY_TYPE: {
      const { project } = payload;
      const { properties } = project;
      const [property] = properties;
      const {
        property_type: { name },
      } = property;

      const propertyType = name.toLowerCase();

      return {
        ...state,
        propertyType,
      };
    }
    case SET_PHOTO_SHARE_UNIT_TYPE: {
      const { units_count: unitsCount, floors_count: floorsCount } = payload;
      let unitType = 'unit';

      if (unitsCount > 0 && floorsCount > 0) {
        unitType = 'unit';
      } else if (floorsCount > 0) {
        unitType = 'floor';
      }

      // we'll set default selected tab on multi unit
      return {
        ...state,
        selectedTab: unitType,
        unitType,
      };
    }
    case SET_PROJECT_ALBUMS:
      return {
        ...state,
        projectAlbums: payload,
      };
    default:
      return state;
  }
};
