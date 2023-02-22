import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';
import { setProperty } from 'Containers/RocketScan/actions';
import { setPropertyData } from '../PropertyData/actions';

export const SET_PROJECT_DAMAGE_TYPES = 'SET_PROJECT_DAMAGE_TYPES';
export const SET_PROPERTY_LOCATIONS = 'SET_PROPERTY_LOCATIONS';
export const FETCHING_LOCATIONS = 'FETCHING_LOCATIONS';
export const SET_PROPERTY_DAMAGE_TYPES = 'SET_PROPERTY_DAMAGE_TYPES';
export const CUSTOM_DAMAGE_TYPE_CREATED = 'CUSTOM_DAMAGE_TYPE_CREATED';
export const SET_PROJECT_DAMAGE_CAUSES = 'SET_PROJECT_DAMAGE_CAUSES';
export const PROPERTY_LOSS_DATA_UPDATED = 'PROPERTY_LOSS_DATA_UPDATED';
export const SET_AFFECTED_LOCATION_ROOMS = 'SET_AFFECTED_LOCATION_ROOMS';
export const AFFECTED_LOCATION_UPDATED = 'AFFECTED_LOCATION_UPDATED';
export const ROOM_SOURCE_STATUS_UPDATED = 'ROOM_SOURCE_STATUS_UPDATED';
export const SET_LOCATION_DAMAGE_TYPES = 'SET_LOCATION_DAMAGE_TYPES';

interface ActionTypes {
  SET_PROJECT_DAMAGE_TYPES: any[];
  SET_PROPERTY_LOCATIONS: any;
  FETCHING_LOCATIONS: boolean;
  SET_PROPERTY_DAMAGE_TYPES: any[];
  CUSTOM_DAMAGE_TYPE_CREATED: boolean;
  SET_PROJECT_DAMAGE_CAUSES: any[];
  PROPERTY_LOSS_DATA_UPDATED: boolean;
  SET_AFFECTED_LOCATION_ROOMS: any[];
  AFFECTED_LOCATION_UPDATED: boolean;
  ROOM_SOURCE_STATUS_UPDATED: boolean;
  SET_LOCATION_DAMAGE_TYPES: any[];
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type LossDataActionTypes = MessageAction;

/*
 * NON-API THUNKS
 * */

export const setCustomDamageTypeCreated = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: CUSTOM_DAMAGE_TYPE_CREATED,
    payload: value,
  });
};

export const setPropertyLossDataUpdated = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: PROPERTY_LOSS_DATA_UPDATED,
    payload: value,
  });
};

export const setAffectedLocationRooms = (rooms: any[]) => async (dispatch: any) => {
  dispatch({
    type: SET_AFFECTED_LOCATION_ROOMS,
    payload: rooms,
  });
};

export const setAffectedLocationUpdated = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: AFFECTED_LOCATION_UPDATED,
    payload: value,
  });
};

export const setRoomSourceStatusUpdated = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: ROOM_SOURCE_STATUS_UPDATED,
    payload: value,
  });
};

export const setProjectDamageTypes = (types: any[]) => async (dispatch: any) => {
  dispatch({
    type: SET_PROJECT_DAMAGE_TYPES,
    payload: types,
  });
};

export const setPropertyDamageTypes = (types: any[]) => async (dispatch: any) => {
  dispatch({
    type: SET_PROPERTY_DAMAGE_TYPES,
    payload: types,
  });
};

export const setPropertyLocations = (locations: any[]) => async (dispatch: any) => {
  dispatch({
    type: SET_PROPERTY_LOCATIONS,
    payload: locations,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */

// get list of all damage types
export const listProjectDamageTypes =
  (projectId: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`projects/${projectId}/property-damage-types`));

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch(setProjectDamageTypes(data));
    }
  };

export const listLocationsForProjectData =
  (propertyId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`/properties/${propertyId}/locations`, {
        params: {
          include: 'locationType,sourceRoom,asbestosStatus',
          'filter[location_type]': 1,
        },
      }),
      FORM_ERRORS,
      FETCHING_LOCATIONS
    );

    if (response?.data?.length > 0) {
      dispatch(setPropertyLocations(response.data));
    } else {
      // clear state
      dispatch(setPropertyLocations([]));
    }
  };

export const createCustomDamageType =
  (projectId: any, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`projects/${projectId}/property-damage-types`, requestData)
    );

    if (response?.data) {
      dispatch(setCustomDamageTypeCreated(true));
    }
  };

// get the list of damage types that apply to this property
export const listPropertyDamageTypes =
  (propertyId: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`properties/${propertyId}/property-damage-types`));

    if (response?.data) {
      const { data } = response;

      dispatch(setPropertyDamageTypes(data));
    }
  };

export const syncPropertyDamageTypes =
  (propertyId: number, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    await handleApiRequest(dispatch, utils.Api.post(`properties/${propertyId}/property-damage-types`, requestData));

    dispatch(listPropertyDamageTypes(propertyId));
  };

export const listProjectDamageCauses =
  (projectId: any, typeFilter?: string, searchFilter?: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`projects/${projectId}/damage-causes`, {
        params: {
          'filter[property_damage_types]': typeFilter,
          'filter[search]': searchFilter,
          include: 'property_damage_type',
          limit: 100,
        },
      })
    );

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: SET_PROJECT_DAMAGE_CAUSES,
        payload: data,
      });
    }
  };

export const updatePropertyLossData =
  (propertyId: any, damageCauseId?: string, damageCategory?: string, lossDate?: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      // if empty or no value passed in, send null to unset values
      utils.Api.put(`properties/${propertyId}`, {
        damage_cause_id: damageCauseId || null,
        damage_category: damageCategory || null,
        loss_date: lossDate || null,
      })
    );

    if (response?.data) {
      dispatch(setPropertyLossDataUpdated(true));
    }
  };

export const updateCauseOfDamage =
  (propertyId: any, damageCauseId?: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.put(`properties/${propertyId}`, {
        damage_cause_id: damageCauseId || null,
      })
    );

    if (response?.data) {
      dispatch(setPropertyLossDataUpdated(true));
    }
  };

export const listRoomsForLossData =
  (locationId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`locations/${locationId}/rooms`, {
        params: {
          include: 'roomType',
        },
      })
    );
    if (response?.data) {
      const { data } = response;

      dispatch(setAffectedLocationRooms(data));
    }
  };

export const updateAffectedLocation =
  (locationId: any, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      // if empty or no value passed in, send null to unset values
      utils.Api.put(`locations/${locationId}`, requestData)
    );
  };

export const updateRoomSourceStatus =
  (roomId: any, isSource: boolean) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.put(`rooms/${roomId}`, {
        is_source: isSource,
      })
    );

    if (response?.data) {
      dispatch(setRoomSourceStatusUpdated(true));
    }
  };

export const createPropertyWithLossData =
  (projectId: number, damageTypesData: any, damageCauseId?: string, damageCategory?: string, lossDate?: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    if (projectId) {
      // create a new property with data
      const response = await handleApiRequest(
        dispatch,
        // needs property to exist to update damage cause
        utils.Api.post(`/projects/${projectId}/properties`, {
          damage_category: damageCategory || null,
          loss_date: lossDate || null,
        })
      );

      if (response?.data) {
        const { data: property } = response;

        // if successful, associate temp property with project
        dispatch(
          setProperty(property, {
            name: 'temp',
          })
        );
        dispatch(setPropertyData(property));

        // update damage type data
        await handleApiRequest(
          dispatch,
          utils.Api.post(`properties/${property.id}/property-damage-types`, damageTypesData)
        );

        const updateDamageCauseResponse = await handleApiRequest(
          dispatch,
          utils.Api.put(`properties/${property.id}`, {
            damage_cause_id: damageCauseId || null,
          })
        );

        if (updateDamageCauseResponse?.data) {
          dispatch(listPropertyDamageTypes(property.id));
          dispatch(setPropertyLossDataUpdated(true));
        }
      }
    }
  };

export const listLocationDamageTypes =
  (locationId: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`locations/${locationId}/property-damage-types`));

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch({
        type: SET_LOCATION_DAMAGE_TYPES,
        payload: data,
      });
    }
  };

export const syncLocationDamageTypes =
  (locationId: number, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    await handleApiRequest(dispatch, utils.Api.post(`locations/${locationId}/property-damage-types`, requestData));
  };
