import { handleApiRequest } from 'Utils/handleApiRequest';

export const SELECTED_REPORT_LOCATIONS = 'SELECTED_REPORT_LOCATIONS';
export const REPORT_CREATING = 'REPORT_CREATING';
export const REPORT_SHARING = 'REPORT_SHARING';
export const REPORT_CREATED = 'REPORT_CREATED';
export const REPORT_DELETED = 'REPORT_DELETED';
export const REPORT_SHARED = 'REPORT_SHARED';
export const PROJECT_REPORTS = 'PROJECT_REPORTS';
export const REPORT_ERRORS = 'REPORT_ERRORS';

interface ActionTypes {
  SELECTED_REPORT_LOCATIONS: any[];
  REPORT_CREATING: boolean;
  REPORT_SHARING: boolean;
  REPORT_CREATED: boolean;
  REPORT_DELETED: boolean;
  REPORT_SHARED: boolean;
  PROJECT_REPORTS: any[];
  REPORT_ERRORS: any[];
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type reportActionTypes = MessageAction;

export const setSelectedReportLocations = (payload: number) => (dispatch) => {
  dispatch({
    type: SELECTED_REPORT_LOCATIONS,
    payload,
  });
};

export const setReportCreated = (payload: boolean) => (dispatch) => {
  dispatch({
    type: REPORT_CREATED,
    payload,
  });
};

export const setReportDeleted = (payload: boolean) => (dispatch) => {
  dispatch({
    type: REPORT_DELETED,
    payload,
  });
};

export const setReportShared = (payload: boolean) => (dispatch) => {
  dispatch({
    type: REPORT_SHARED,
    payload,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */

export const createReport =
  (projectId: number, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`projects/${projectId}/reports`, requestData),
      REPORT_ERRORS,
      REPORT_CREATING
    );

    if (response?.data) {
      dispatch(setReportCreated(true));
    }
  };

export const listProjectReports =
  (projectId: number, sort = '-created_at', page = 1) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response: any = await handleApiRequest(
      dispatch,
      utils.Api.get(`projects/${projectId}/reports`, {
        params: {
          include: 'creator',
          limit: 5,
          sort,
          page,
        },
      })
    );

    if (response?.data) {
      dispatch({
        type: PROJECT_REPORTS,
        payload: response,
      });
    }
  };

export const deleteReport =
  (reportId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.delete(`reports/${reportId}`));

    if (typeof response === 'string') {
      dispatch(setReportDeleted(true));
    }
  };

export const shareReport =
  (reportId: number, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`reports/${reportId}/shares`, requestData),
      REPORT_ERRORS,
      REPORT_SHARING
    );

    if (typeof response === 'string') {
      dispatch(setReportShared(true));
    }
  };
