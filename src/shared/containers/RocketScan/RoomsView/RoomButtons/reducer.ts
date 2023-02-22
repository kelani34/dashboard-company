import {
  FETCHING_ROOM_BUTTONS,
  SET_ROOM_BUTTONS,
  roomButtonsActionTypes,
  SET_SELECTED_ROOM,
  SET_ROOM_LEVELS,
} from 'Containers/RocketScan/RoomsView/RoomButtons/actions';

const initialState = {
  levelRooms: [],
  rooms: [], // to hold local copy of incoming rooms
  totalRooms: 0,
  totalAllRooms: 0,
  currentPage: 1,
  lastPage: 1,
  fetchingRoomButtons: true,
  selectedRoomId: undefined,
  roomLevels: [], // list of room levels
};

export const roomButtonsReducer = (state = initialState, actions: roomButtonsActionTypes) => {
  const { type, payload } = actions;

  switch (type) {
    case SET_ROOM_BUTTONS: {
      const levelRooms = [];
      let totalAllRooms = 0;
      let currentPage = 1;
      let lastPage = 1;
      let localRooms = state.rooms;
      let totalRooms = state.totalRooms;
      const roomLevels = state.roomLevels;

      if (payload?.data?.length > 0) {
        const {
          data: rooms,
          meta: { total, current_page: current, last_page: last },
          pageNumber,
        } = payload;

        if (pageNumber > currentPage) {
          localRooms = [...localRooms, ...rooms];
        } else {
          localRooms = rooms;
        }

        currentPage = current;
        lastPage = last;

        totalAllRooms = total;
        totalRooms = rooms.length;

        // prepare sorted level rooms array
        roomLevels.forEach((roomLevel: any) => {
          const filteredRooms = localRooms
            .filter(({ level: { name: levelName } }: any) => levelName === roomLevel)
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
          levelRooms[roomLevel] = {
            levelName: roomLevel,
            rooms: filteredRooms,
          };
        });
      }

      return {
        ...state,
        roomLevels,
        levelRooms: Object.values(levelRooms),
        rooms: localRooms,
        totalAllRooms,
        totalRooms,
        currentPage,
        lastPage,
      };
    }
    case FETCHING_ROOM_BUTTONS:
      return {
        ...state,
        fetchingRoomButtons: payload,
      };
    case SET_SELECTED_ROOM:
      return {
        ...state,
        selectedRoomId: payload,
      };
    case SET_ROOM_LEVELS:
      return {
        ...state,
        roomLevels: payload,
      };
    default:
      return state;
  }
};
