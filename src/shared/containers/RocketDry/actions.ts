import { handleApiRequest } from 'Utils/handleApiRequest';

export const SET_PROJECT_ATMOSPHERIC_LOGS = 'SET_PROJECT_ATMOSPHERIC_LOGS';
export const SET_PROJECT_EQUIPMENT_LIST = 'SET_PROJECT_EQUIPMENT_LIST';

interface ActionTypes {
  SET_PROJECT_ATMOSPHERIC_LOGS: any;
  SET_PROJECT_EQUIPMENT_LIST: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type RocketDryActionTypes = MessageAction;

/*
 * NON-API THUNKS
 * */

export const setProjectAtmosphericLogs = (logs: any[]) => async (dispatch: any) => {
  dispatch({
    type: SET_PROJECT_ATMOSPHERIC_LOGS,
    payload: logs,
  });
};

export const setProjectEquipmentList = (list: any[]) => async (dispatch: any) => {
  dispatch({
    type: SET_PROJECT_EQUIPMENT_LIST,
    payload: list,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */

export const listLocationsForRocketDry =
  (propertyId: number, pageNumber = 1) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`/properties/${propertyId}/locations`, {
        params: {
          include: 'locationType,sourceRoom,asbestosStatus',
          sort: '-floor_number,location_type,-name',
          page: pageNumber,
        },
      })
    );
  };

export const listLocationRoomsForRocketDry =
  (locationId: number, pageNumber = 1) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`/locations/${locationId}/rooms`, {
        params: {
          include: 'roomType,level',
          page: pageNumber,
        },
      })
    );
  };

/*
 * Moisture atmospheric APIs
 */

export const getProjectAtmosphericLogs =
  (projectId: number, setFetching: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    setFetching(true);
    const response = await handleApiRequest(dispatch, utils.Api.get(`projects/${projectId}/atmospheric-logs`));

    if (response?.data) {
      const { data } = response;
      dispatch(setProjectAtmosphericLogs(data));
      setFetching(false);
    } else {
      setFetching(false);
    }
  };

export const getRoomAtmosphericLogs =
  (roomId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`rooms/${roomId}/atmospheric-logs`, {
        params: {
          sort: '-room_area,-created_at',
        },
      })
    );
  };

export const addRoomAtmosphericLogs =
  (roomId: number, relativeHumidity: number, temperature: number, gpp: number, dewPoint: number, roomArea?: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`rooms/${roomId}/atmospheric-logs`, {
        room_area: roomArea,
        relative_humidity: relativeHumidity,
        temperature,
        gpp,
        dew_point: dewPoint,
      })
    );

    if (response?.data) {
      const { data } = response;
      // handle response
    }
  };

export const getMaterialWithDryingLogs =
  (roomId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(dispatch, utils.Api.get(`rooms/${roomId}/damage-materials/logs`));
  };

export const getDryingLogsForMaterial =
  (roomId: number, materialID: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(dispatch, utils.Api.get(`rooms/${roomId}/damage-materials/${materialID}/logs`));
  };

export const setDryingGoal =
  (roomId: number, materialId: number, dryingGoal: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`rooms/${roomId}/damage-materials/${materialId}`, {
        drying_goal: dryingGoal,
      })
    );
    if (response?.data) {
      const { data } = response;
      // handle response
    }
  };

export const createDryingLog =
  (roomId: number, materialId: number, reading: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`rooms/${roomId}/damage-materials/${materialId}}/logs`, {
        reading: reading,
      })
    );
    if (response?.data) {
      const { data } = response;
      // handle response
    }
  };

/*
 * Equipment log APIs
 */

export const createCustomEquipmentType =
  (projectId: number, name: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`projects/${projectId}/equipment`, {
        name,
      })
    );
    if (response?.data) {
      const { data } = response;
      // handle response
    }
  };

export const getProjectEquipmentList =
  (projectId: number, setFetching: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    setFetching(true);
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`projects/${projectId}/equipment`, {
        params: {
          include: 'count',
        },
      })
    );

    if (response?.data) {
      const { data } = response;
      dispatch(setProjectEquipmentList(data));
      setFetching(false);
    } else {
      setFetching(false);
    }
  };

export const addEquipmentToRoom =
  (roomId: number, equipmentIds: number[]) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`rooms/${roomId}/equipment`, {
        equipment_ids: equipmentIds,
      })
    );
    if (response?.data) {
      const { data } = response;
      // handle response
    }
  };

export const getRoomEquipmentList =
  (roomId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(dispatch, utils.Api.get(`rooms/${roomId}/equipment`));
  };

export const updateEquipmentInRoom =
  (equipmentRoomId: number, newQuantity: number, newDuration: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.put(`equipment-rooms/${equipmentRoomId}`, {
        quantity: newQuantity,
        duration: newDuration,
      })
    );
    if (response?.data) {
      const { data } = response;
      // handle response
    }
  };

export const deleteEquipmentInRoom =
  (equipmentRoomId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.delete(`equipment-rooms/${equipmentRoomId}`));
    if (response?.data) {
      const { data } = response;
      // handle response
    }
  };
