import { handleApiRequest } from 'Utils/handleApiRequest';

export const CLAIMS = 'CLAIMS';
export const CLAIM = 'CLAIM';
export const CLAIM_CREATED = 'CLAIM_CREATED';
export const CLAIM_UPDATED = 'CLAIM_UPDATED';
export const FETCH_CLAIM_TYPES = 'FETCH_CLAIM_TYPES';
export const CLAIM_CREATE_ERRORS = 'CLAIM_CREATE_ERRORS';
export const CLAIM_DELETED = 'CLAIM_DELETED';

interface ActionTypes {
  CLAIMS: any;
  CLAIM: any;
  CLAIM_CREATED: boolean;
  CLAIM_UPDATED: boolean;
  FETCH_CLAIM_TYPES: any;
  CLAIM_CREATE_ERRORS: any;
  CLAIM_DELETED: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type ClaimActionTypes = MessageAction;

/*
 * NON API THUNKS, NOT ASYNC
 * */

export const setClaim = (value: any) => (dispatch) => {
  dispatch({
    type: CLAIM,
    payload: value,
  });
};

export const setClaimCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: CLAIM_CREATED,
    payload: value,
  });
};

export const setClaimUpdated = (value: boolean) => (dispatch) => {
  dispatch({
    type: CLAIM_UPDATED,
    payload: value,
  });
};

export const setClaimDeleted = (value: any) => (dispatch) => {
  dispatch({
    type: CLAIM_DELETED,
    payload: value,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */

export const getClaims =
  (projectId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`projects/${projectId}/claims`));

    if (response?.data) {
      const { data } = response;
      dispatch({
        type: CLAIMS,
        payload: data,
      });
    }
  };

export const createClaim =
  (projectId: number, requestData) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`projects/${projectId}/claims`, requestData),
      CLAIM_CREATE_ERRORS
    );

    if (response?.data) {
      const { data } = response;
      dispatch(setClaim(data));
      dispatch(setClaimCreated(true));
    }
  };

export const updateClaim =
  (claimId: number, requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.put(`claims/${claimId}`, requestData));

    if (response?.data) {
      const { data } = response;
      dispatch(setClaim(data));
      dispatch(setClaimUpdated(true));
    }
  };

export const fetchClaimTypes =
  () =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`claim-types`));

    if (response?.data) {
      const { data } = response;
      dispatch({
        type: FETCH_CLAIM_TYPES,
        payload: data,
      });
    }
  };

export const deleteClaim =
  (claimId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.delete(`/claims/${claimId}`), '');
    if (typeof response === 'string') {
      dispatch(setClaimDeleted(true));
    }
  };
