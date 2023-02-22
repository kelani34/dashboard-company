/* eslint-disable */
import { handleApiRequest } from 'Utils/handleApiRequest';
import {
  FETCHING_ROOMS,
  SET_ALL_ROOMS,
  SET_ALL_ROOMS_WITH_PHOTOS,
  SET_UNIT_ROOMS_WITH_PHOTOS,
  setSelectedUnitRooms,
} from 'Containers/Project/Unit/Rooms/actions';
import { FORM_ERRORS } from 'Containers/Core/actions';
import { ADD_PROPERTY_AND_UNIT, setUnitRooms, SET_SELECTED_UNIT_ID } from 'Containers/Projects/actions';

export const SET_UNITS = 'SET_UNITS';
export const SET_UNIT = 'SET_UNIT';
export const SET_FLOORS = 'SET_FLOORS';
export const SET_FLOOR = 'SET_FLOOR';
export const SET_MULTI_UNIT = 'SET_MULTI_UNIT';
export const SET_SINGLE_UNIT = 'SET_SINGLE_UNIT';
export const UNIT_CREATED = 'UNIT_CREATED';
export const FLOOR_CREATED = 'FLOOR_CREATED';
export const ROOM_CREATED = 'ROOM_CREATED';
export const SET_SELECTED_PHOTO_FILTER = 'SET_SELECTED_PHOTO_FILTER';
export const SELECTED_MULTI_UNIT = 'SELECTED_MULTI_UNIT';

interface ActionTypes {
  SET_UNITS: any;
  SET_UNIT: any;
  SET_FLOORS: any;
  SET_FLOOR: any;
  SET_MULTI_UNIT: any;
  SET_SINGLE_UNIT: any;
  UNIT_CREATED: boolean;
  FLOOR_CREATED: boolean;
  ROOM_CREATED: number;
  SET_SELECTED_PHOTO_FILTER: string;
  FETCHING_UNITS: boolean;
  SELECTED_MULTI_UNIT: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type setUnitActionTypes = MessageAction;

export const setSingleUnit = (properties: []) => async (dispatch: any) => {
  if (properties.length > 0) {
    const property: any = properties.find((property: any) => property.property_type.id === 1);

    if (property?.units) {
      const { units } = property;

      dispatch({
        type: SET_SINGLE_UNIT,
        payload: units?.[0],
      });
    } else {
      dispatch({
        type: SET_SINGLE_UNIT,
        payload: {},
      });
    }
  } else {
    dispatch({
      type: SET_SINGLE_UNIT,
      payload: {},
    });
  }
};

export const setMultiUnit = (properties: []) => async (dispatch: any) => {
  if (properties.length > 0) {
    const property: any = properties.find((property: any) => property.property_type.id === 2);

    if (property?.units) {
      const { units }: any = property;

      dispatch({
        type: SET_MULTI_UNIT,
        payload: units?.[0],
      });
    } else {
      dispatch({
        type: SET_MULTI_UNIT,
        payload: {},
      });
    }
  } else {
    dispatch({
      type: SET_MULTI_UNIT,
      payload: {},
    });
  }
};

export const listUnitRooms =
  (unitId: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api['get'](`units/${unitId}/rooms?sort=level_id`, { params: { include: 'roomType,level, photosCount' } }),
      FORM_ERRORS,
      FETCHING_ROOMS
    );

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: SET_ALL_ROOMS,
        payload: data,
      });

      // set unit rooms data for single unit photo upload page
      dispatch(setUnitRooms(data));
    }
  };

export const listUnitRoomsWithPhotos =
  (unitId: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api['get'](`units/${unitId}/rooms?sort=level_id`, {
        params: { include: 'roomType,level,photosCount,photos,thumbnail' },
      }),
      FORM_ERRORS,
      FETCHING_ROOMS
    );

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: SET_ALL_ROOMS_WITH_PHOTOS,
        payload: data,
      });

      // set unit rooms data for single unit photo upload page
      dispatch(setUnitRooms(data));
    }
  };

export const setUnitRoomsWithPhotos =
  (unitId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api['get'](`units/${unitId}/rooms?sort=level_id`, {
        params: { include: 'roomType,level,photosCount,photos,thumbnail' },
      }),
      FORM_ERRORS,
      FETCHING_ROOMS
    );

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch({
        type: SET_UNIT_ROOMS_WITH_PHOTOS,
        payload: {
          unitId,
          rooms: data,
        },
      });
    } else {
      dispatch({
        type: SET_UNIT_ROOMS_WITH_PHOTOS,
        payload: {
          unitId,
          rooms: [],
        },
      });
    }
  };

export const setUnitCreated = (value: boolean) => async (dispatch) => {
  dispatch({
    type: UNIT_CREATED,
    payload: value,
  });
};

export const setFloorCreated = (value: boolean) => async (dispatch) => {
  dispatch({
    type: FLOOR_CREATED,
    payload: value,
  });
};

export const setRoomCreated = (value: number) => async (dispatch) => {
  dispatch({
    type: ROOM_CREATED,
    payload: value,
  });
};

export const setSelectedPhotoFilter = (value: string) => async (dispatch) => {
  dispatch({
    type: SET_SELECTED_PHOTO_FILTER,
    payload: value,
  });
};

export const setUnit = (newPropertyData: any, newUnitData: any, projectId: number) => async (dispatch) => {
  //Add the rooms
  newUnitData.rooms = []; //This will hold future rooms

  //Add the units
  newPropertyData.units = {};
  newPropertyData.units[newUnitData.id] = newUnitData;

  dispatch({
    type: ADD_PROPERTY_AND_UNIT,
    payload: {
      projectId: projectId,
      selectedUnitId: newUnitData.id,
      newProperty: newPropertyData,
    },
  });

  // set the unit data for project header on add rooms and photos photo
  dispatch({
    type: SET_UNIT,
    payload: newUnitData,
  });

  // fetch unit rooms and set
  dispatch(listUnitRooms(newUnitData.id));
};

export const setSelectedMultiUnit = (data: any) => async (dispatch) => {
  dispatch({
    type: SELECTED_MULTI_UNIT,
    payload: data,
  });
};

export const setSelectedUnit = (propertyId: number, unit: any) => async (dispatch) => {
  dispatch({
    type: SET_SELECTED_UNIT_ID,
    payload: {
      propertyId: propertyId,
      unitId: unit.id,
    },
  });
  dispatch({
    type: SET_UNIT,
    payload: unit,
  });
  dispatch({
    type: UNIT_CREATED,
    payload: true,
  });
};
