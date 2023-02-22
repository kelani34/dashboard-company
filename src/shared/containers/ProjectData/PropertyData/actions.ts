/* eslint-disable */
import { handleApiRequest } from 'Utils/handleApiRequest';

export const SET_PROPERTY_DATA = 'SET_PROPERTY_DATA';
export const PROPERTY_DATA_EDITED = 'PROPERTY_DATA_EDITED';
export const SET_ASBESTOS_STATUSES = 'SET_ASBESTOS_STATUSES';
export const EDIT_PROPERTY_DATA_ERRORS = 'EDIT_PROPERTY_DATA_ERRORS';

interface ActionTypes {
  SET_PROPERTY_DATA: object;
  PROPERTY_DATA_EDITED: boolean;
  SET_ASBESTOS_STATUSES: object;
  EDIT_PROPERTY_DATA_ERRORS: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type propertyDataActionTypes = MessageAction;

/*
 * NON API THUNKS
 * */

export const setPropertyData = (property: any) => async (dispatch: any) => {
  const {
    id,
    is_residential: isResidential,
    is_commercial: isCommercial,
    name: buildingName,
    year_built: yearBuilt,
    asbestos_status: asbestosStatus,
    damage_cause: damageCause,
    damage_category: damageCategory,
    loss_date: lossDate,
  } = property;

  dispatch({
    type: SET_PROPERTY_DATA,
    payload: {
      id,
      isResidential,
      isCommercial,
      buildingName,
      yearBuilt,
      asbestosStatus,
      damageCause,
      damageCategory,
      lossDate,
    },
  });
};

export const setPropertyDataEdited = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: PROPERTY_DATA_EDITED,
    payload: value,
  });
};

export const setAsbestosStatuses = (statusTypes: any) => async (dispatch: any) => {
  const statuses = statusTypes.map((type: any) => ({
    id: type.id,
    name: type.name,
  }));

  dispatch({
    type: SET_ASBESTOS_STATUSES,
    payload: statuses,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */

export const getPropertyData =
  (propertyId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    if (propertyId) {
      const response = await handleApiRequest(
        dispatch,
        utils.Api.get(`properties/${propertyId}`, {
          params: {
            include: 'asbestosStatus,damageCause',
          },
        })
      );
      if (response?.data) {
        const { data } = response;

        dispatch(setPropertyData(data));
      }
    }
  };

export const editPropertyData =
  (propertyId: string, requestedData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    if (propertyId) {
      const response = await handleApiRequest(
        dispatch,
        utils.Api.put(`properties/${propertyId}`, requestedData),
        EDIT_PROPERTY_DATA_ERRORS
      );

      if (response?.data) {
        const { data } = response;

        dispatch(setPropertyData(data));
        dispatch(setPropertyDataEdited(true));
      }
    }
  };

export const updateProjectTypeId =
  (projectId: string, requestedData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    if (projectId) {
      const response = await handleApiRequest(dispatch, utils.Api.put(`projects/${projectId}`, requestedData));

      if (response?.data) {
        dispatch(setPropertyDataEdited(true));
      }
    }
  };

export const listAsbestosStatuses =
  () =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`asbestos-statuses`));

    if (response?.data?.length > 0) {
      const { data } = response;
      dispatch(setAsbestosStatuses(data));
    }
  };

export const createPropertyForNewProject =
  (projectId: number, requestedData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    if (projectId) {
      // create a new property with data
      const response = await handleApiRequest(
        dispatch,
        utils.Api.post(`/projects/${projectId}/properties`, requestedData)
      );
      if (response?.data) {
        dispatch(setPropertyDataEdited(true));
      }
    }
  };
