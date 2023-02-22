import {
  FETCHING_ALBUMS,
  FETCHING_ROOMS,
  PHOTO_CREATED,
  ROOM_LEVEL_UPDATED,
  SELECTED_UNIT_ROOMS,
  SET_ALBUMS,
  SET_ALL_ROOMS,
  SET_ALL_ROOMS_WITH_PHOTOS,
  SET_PHOTOS,
  SET_ROOMS_ALBUMS_PHOTOS,
  SET_SELECTED_ROOM_ID,
  SET_UNIT_ROOMS_WITH_PHOTOS,
  setRoomsActionTypes,
} from "Containers/Project/Unit/Rooms/actions";

const initialState = {
  allRooms: [], // raw rooms array
  allRoomsWithPhotos: [],
  unitRoomsWithPhotos: [],
  albums: [],
  photos: [],
  photoRooms: [], // to store albums and photos
  selectedRoomId: "",
  fetchingRooms: false,
  fetchingAlbums: false,
  photoCreated: false,
  roomLevelUpdated: false,
  selectedUnitRooms: [],
};

export const roomsReducer = (state = initialState, action: setRoomsActionTypes) => {
  switch (action.type) {
    case SET_ALL_ROOMS:
      return {
        ...state,
        allRooms: action.payload,
      };
    case SET_ALL_ROOMS_WITH_PHOTOS:
      return {
        ...state,
        allRoomsWithPhotos: action.payload,
      };
    case SET_UNIT_ROOMS_WITH_PHOTOS: {
      const { unitId, rooms } = action.payload;

      const existingUnitRooms = state.unitRoomsWithPhotos;

      let newUnitRooms = [];

      // // find the existing unit and assign new rooms
      if (existingUnitRooms.find((unitRoom: any) => unitRoom.unitId === unitId)) {
        existingUnitRooms.find((unitRoom: any) => unitRoom.unitId === unitId).rooms = rooms;
        newUnitRooms = existingUnitRooms;
      } else {
        newUnitRooms = [...state.unitRoomsWithPhotos, action.payload];
      }

      // console.log('newUnitRooms', newUnitRooms);

      return {
        ...state,
        unitRoomsWithPhotos: newUnitRooms,
      };
    }
    case SET_SELECTED_ROOM_ID:
      return {
        ...state,
        selectedRoomId: action.payload,
      };
    case SET_ALBUMS:
      return {
        ...state,
        albums: action.payload,
      };

    case SET_PHOTOS:
      return {
        ...state,
        photos: action.payload,
      };
    case SET_ROOMS_ALBUMS_PHOTOS: {
      const newPhotoRoom = action.payload;
      const previousPhotoRooms = state.photoRooms;

      let newPhotoRooms = [];

      // find the existing room id and assign new photos list, else return the previous list with new photo room data
      if (
        previousPhotoRooms.find(
          (photoRoom: any) => photoRoom.roomId === newPhotoRoom.roomId && photoRoom.albumId === newPhotoRoom.albumId
        )
      ) {
        previousPhotoRooms.find(
          (photoRoom: any) => photoRoom.roomId === newPhotoRoom.roomId && photoRoom.albumId === newPhotoRoom.albumId
        ).photos = newPhotoRoom.photos;
        newPhotoRooms = previousPhotoRooms;
      } else {
        newPhotoRooms = [...state.photoRooms, action.payload];
      }

      return {
        ...state,
        photoRooms: newPhotoRooms,
      };
    }
    case FETCHING_ROOMS:
      return {
        ...state,
        fetchingRooms: action.payload,
      };
    case FETCHING_ALBUMS:
      return {
        ...state,
        fetchingAlbums: action.payload,
      };
    case PHOTO_CREATED:
      return {
        ...state,
        photoCreated: action.payload,
      };
    case ROOM_LEVEL_UPDATED:
      return {
        ...state,
        roomLevelUpdated: action.payload,
      };
    case SELECTED_UNIT_ROOMS: {
      const data = action.payload;
      let results = [];

      if (data.length > 0) {
        results = [...state.selectedUnitRooms, ...action.payload];
      }

      return {
        ...state,
        selectedUnitRooms: results,
      };
    }
    default:
      return state;
  }
};
