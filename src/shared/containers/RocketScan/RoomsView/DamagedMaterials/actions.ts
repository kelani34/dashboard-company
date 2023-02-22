import { handleApiRequest } from 'Utils/handleApiRequest';

export const CUSTOM_DAMAGED_MATERIAL_CREATED = 'CUSTOM_DAMAGED_MATERIAL_CREATED';
export const CUSTOM_DAMAGED_MATERIAL_UPDATED = 'CUSTOM_DAMAGED_MATERIAL_UPDATED';
export const CUSTOM_DAMAGED_MATERIAL_DELETED = 'CUSTOM_DAMAGED_MATERIAL_DELETED';
export const CREATE_CUSTOM_DAMAGED_MATERIAL_ERRORS = 'CREATE_CUSTOM_DAMAGED_MATERIAL_ERRORS';
export const EDIT_CUSTOM_DAMAGED_MATERIAL_ERRORS = 'EDIT_CUSTOM_DAMAGED_MATERIAL_ERRORS';

interface ActionTypes {
  CUSTOM_DAMAGED_MATERIAL_CREATED: string;
  CUSTOM_DAMAGED_MATERIAL_UPDATED: string;
  CUSTOM_DAMAGED_MATERIAL_DELETED: string;
  CREATE_CUSTOM_DAMAGED_MATERIAL_ERRORS: string;
  EDIT_CUSTOM_DAMAGED_MATERIAL_ERRORS: string;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type customDamagedMaterials = MessageAction;

/*
 * NON API THUNKS, NOT ASYNC
 * */

export const setCustomDamagedMaterialCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: CUSTOM_DAMAGED_MATERIAL_CREATED,
    payload: value,
  });
};

export const setCustomDamagedMaterialUpdated = (value: boolean) => (dispatch) => {
  dispatch({
    type: CUSTOM_DAMAGED_MATERIAL_UPDATED,
    payload: value,
  });
};

export const setCustomDamagedMaterialDeleted = (value: boolean) => (dispatch) => {
  dispatch({
    type: CUSTOM_DAMAGED_MATERIAL_DELETED,
    payload: value,
  });
};
/*
 * API THUNKS
 * */

/* eslint-disable */

export const syncRoomDamagedMaterials =
  (roomId: number, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    await handleApiRequest(dispatch, utils.Api.post(`/rooms/${roomId}/damage-materials`, requestData));
  };

export const createCustomDamagedMaterial =
  (projectId: number, requestData: any, setFetching: any, setErrors: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    setFetching(true);

    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`projects/${projectId}/damage-materials`, requestData),
      '',
      '',
      setErrors
    );

    if (response?.data) {
      dispatch(setCustomDamagedMaterialCreated(true));
    }
    setFetching(false);
  };

export const updateCustomDamagedMaterial =
  (materialId: number, requestData: any, disableEditMode: any, setFetching: any, setErrors: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    setFetching(true);

    const response = await handleApiRequest(
      dispatch,
      utils.Api.put(`damage-materials/${materialId}`, requestData),
      '',
      '',
      setErrors
    );

    if (response?.data) {
      // allow re-fetching the material list
      dispatch(setCustomDamagedMaterialUpdated(true));
      // disable edit mode on individual container
      setTimeout(() => disableEditMode(), 1000);
    }

    setFetching(false);
  };

export const deleteCustomDamagedMaterial =
  (materialId: number, setErrors: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.delete(`damage-materials/${materialId}`),
      '',
      '',
      setErrors
    );

    if (typeof response === 'string') {
      dispatch(setCustomDamagedMaterialDeleted(true));
    }
  };

export const updateMaterialScopeOfWork =
  (roomId: number, materialId: number, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    await handleApiRequest(dispatch, utils.Api.post(`/rooms/${roomId}/damage-materials/${materialId}`, requestData));
  };

export const getRoomDamageMaterials =
  (roomId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`/rooms/${roomId}/damage-materials`, {
        params: {
          include: 'damageType',
        },
      })
    );
  };
