import {
  CLEAR_ROOM_BUTTONS_AND_ROOMS,
  FETCHING_LOCATION_ROOMS,
  ROOM_CREATED,
  ROOM_DELETED,
  ROOM_LEVEL_UPDATED,
  roomsActionTypes,
  SET_LEVELS_FOR_BUTTONS,
  SET_LOCATION_ROOMS,
  SET_ROOM_BUTTONS_AND_ROOMS,
  UPLOADING_ALBUMS,
} from './actions';

const initialState = {
  levels: [],
  rooms: [], // to hold local copy of incoming rooms
  levelRooms: [], // to hold grouped room buttons
  totalRooms: 0,
  totalAllRooms: 0,
  currentPage: 1,
  lastPage: 1,
  fetchingLocationRooms: true,
  roomCreated: false,
  roomDeleted: false,
  roomLevelUpdated: false,
  uploadingAlbums: [],
};

// prepare sorted level rooms array
const prepareLevelRooms = (levels, localRooms, levelRooms) => {
  levels.forEach((level: any) => {
    const filteredRooms = localRooms
      .filter(({ level: { name: levelName } }: any) => levelName === level)
      .map(
        ({
          id,
          room_type: { name, is_standard: isStandard },
          level: { name: levelName },
          type_occurrence: typeOccurrence,
        }: any) => ({
          id,
          name,
          isStandard,
          levelName,
          typeOccurrence,
        })
      );
    levelRooms[level] = {
      levelName: level,
      rooms: filteredRooms,
    };
  });

  return Object.values(levelRooms);
};

export const newRoomsReducer = (state = initialState, action: roomsActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOCATION_ROOMS: {
      let newRooms = [];
      let levelRooms = [];
      let totalAllRooms = 0;
      let currentPage = 1;
      let lastPage = 1;
      const levels = state.levels;
      const localRooms = state.rooms;
      let totalRooms = state.totalRooms;

      if (payload?.data?.length > 0) {
        const {
          data: rooms,
          meta: { total, current_page: current, last_page: last },
          pageNumber,
        } = payload;

        // set rooms
        if (pageNumber !== currentPage) {
          newRooms = [...localRooms, ...rooms];
        } else {
          newRooms = rooms;
        }

        // set levels and rooms
        levelRooms = prepareLevelRooms(levels, newRooms, levelRooms);

        currentPage = current;
        lastPage = last;

        totalAllRooms = total;
        totalRooms = rooms.length;
      }

      return {
        ...state,
        rooms: newRooms,
        levelRooms,
        totalAllRooms,
        totalRooms,
        currentPage,
        lastPage,
      };
    }
    case SET_ROOM_BUTTONS_AND_ROOMS: {
      let newRooms = [];
      let levelRooms = [];
      let totalAllRooms = 0;
      let currentPage = 1;
      let lastPage = 1;
      const levels = state.levels;
      let totalRooms = state.totalRooms;

      if (payload?.rooms?.length > 0) {
        const {
          rooms,
          meta: { total, current_page: current, last_page: last },
        } = payload;

        newRooms = rooms;
        levelRooms = prepareLevelRooms(levels, rooms, levelRooms);

        currentPage = current;
        lastPage = last;

        totalAllRooms = total;
        totalRooms = rooms.length;
      }

      return {
        ...state,
        rooms: newRooms,
        totalAllRooms,
        totalRooms,
        currentPage,
        lastPage,
        levelRooms,
        fetchingLocationRooms: false,
      };
    }
    case FETCHING_LOCATION_ROOMS:
      return {
        ...state,
        fetchingLocationRooms: payload,
      };
    case ROOM_LEVEL_UPDATED:
      return {
        ...state,
        roomLevelUpdated: payload,
      };
    case ROOM_CREATED:
      return {
        ...state,
        roomCreated: payload,
      };
    case ROOM_DELETED:
      return {
        ...state,
        roomDeleted: payload,
      };
    case SET_LEVELS_FOR_BUTTONS:
      return {
        ...state,
        levels: payload,
      };
    case UPLOADING_ALBUMS: {
      const uploadingAlbums = state.uploadingAlbums;
      const { albumId, roomId, clear = false } = payload;

      if (!state.uploadingAlbums.find((item: any) => item.albumId === albumId && item.roomId === roomId)) {
        uploadingAlbums.push({
          albumId,
          roomId,
        });
      } else if (clear) {
        uploadingAlbums.filter((item: any) => item.albumId !== albumId && item.roomId === roomId);
      }

      return {
        ...state,
        uploadingAlbums,
      };
    }
    case CLEAR_ROOM_BUTTONS_AND_ROOMS:
      return initialState;
    default:
      return state;
  }
};
