/* eslint-disable */

import { handleApiRequest } from 'Utils/handleApiRequest';
import { SET_UNITS, setMultiUnit, setSingleUnit } from 'Containers/Project/Unit/actions';
import { listPropertyWithFloorsAndRooms } from 'Containers/Project/Floor/actions';
import { FORM_ERRORS } from 'Containers/Core/actions';
import { setProjectAlias, setProjectStatus } from 'Containers/RocketScan/actions';

export const SET_PROPERTY = 'SET_PROPERTY';
export const SET_PROPERTY_SINGLE = 'SET_PROPERTY_SINGLE';
export const SET_PROPERTY_TYPE = 'SET_PROPERTY_TYPE';
export const FETCHING_PROPERTIES = 'FETCHING_PROPERTIES';
export const FETCHING_UNITS_WITH_ROOMS = 'FETCHING_UNITS_WITH_ROOMS';
export const PROJECT_DELETED = 'PROJECT_DELETED';

interface ActionTypes {
  SET_PROPERTY: any;
  SET_PROPERTY_SINGLE: any;
  SET_PROPERTY_TYPE: string;
  FETCHING_PROPERTIES: boolean;
  FETCHING_UNITS_WITH_ROOMS: boolean;
  PROJECT_STATUS_UPDATED: boolean;
  PROJECT_DELETED: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type setProjectActionTypes = MessageAction;

export const listProjectPropertiesWithUnits =
  (projectId: string, type = 'get') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api[type](`projects/${projectId}/properties`, {
        params: {
          include: 'units,floors,propertyType',
        },
      }),
      FORM_ERRORS,
      FETCHING_PROPERTIES
    );

    if (response?.data?.length > 0) {
      const { data } = response;

      const { id, property_type } = data[0];

      // list units for this property
      dispatch(listPropertyWithUnitsAndRooms(id));

      // list floors for this property
      dispatch(listPropertyWithFloorsAndRooms(id));

      // set property type
      dispatch({
        type: SET_PROPERTY_TYPE,
        payload: property_type.id,
      });

      dispatch(setSingleUnit(data));
      dispatch(setMultiUnit(data));
      dispatch(setProjectProperty(data));
      dispatch(setProjectPropertySingle(data));
    } else {
      // we need to clear redux state from the memory
      dispatch(setSingleUnit([]));
      dispatch(setMultiUnit([]));
      dispatch(setProjectProperty([]));
      dispatch(setProjectPropertySingle([]));
      dispatch({
        type: SET_PROPERTY_TYPE,
        payload: undefined,
      });
    }
  };

export const listPropertyWithUnitsAndRooms =
  (propertyId: number, type = 'get') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api[type](`properties/${propertyId}/units`, {
        params: {
          include: 'rooms,rooms.roomType,rooms.level',
        },
      }),
      FORM_ERRORS,
      FETCHING_UNITS_WITH_ROOMS
    );

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch({
        type: SET_UNITS,
        payload: data,
      });
    } else {
      dispatch({
        type: SET_UNITS,
        payload: [],
      });
    }
  };

export const updateProjectAlias =
  (projectId: string, alias: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.put(`projects/${projectId}`, {
        alias: alias,
      }),
      FORM_ERRORS
    );

    if (response?.data?.alias) {
      const { alias } = response.data;
      dispatch(setProjectAlias(alias));
    } else {
      dispatch(setProjectAlias(undefined));
    }
  };

export const updateProjectStatus =
  (projectId: string, statusId: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.put(`projects/${projectId}?include=projectStatus`, {
        project_status_id: statusId,
      }),
      FORM_ERRORS
    );

    if (response?.data?.project_status) {
      const { project_status: projectStatus } = response?.data;
      dispatch(setProjectStatus(projectStatus));
    }
  };

export const deleteProject =
  (projectId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.delete(`projects/${projectId}`));

    if (typeof response === 'string') {
      dispatch(setProjectDeleted(true));
    }
  };

/*
 * NON-API THUNKS
 * */

export const setProjectPropertySingle = (properties: any) => async (dispatch) => {
  const property = properties?.find((property: any) => property.property_type.id === 1);

  if (property) {
    dispatch({
      type: SET_PROPERTY_SINGLE,
      payload: property,
    });
  }
};

export const setProjectProperty = (properties: any) => async (dispatch) => {
  if (properties.length > 0) {
    const property = properties?.find((property: any) => property.property_type.id === 2);

    if (property) {
      dispatch({
        type: SET_PROPERTY,
        payload: property,
      });
    } else {
      dispatch({
        type: SET_PROPERTY,
        payload: {},
      });
    }
  } else {
    dispatch({
      type: SET_PROPERTY,
      payload: {},
    });
  }
};

export const setProjectDeleted = (value: boolean) => (dispatch) => {
  dispatch({
    type: PROJECT_DELETED,
    payload: value,
  });
};
