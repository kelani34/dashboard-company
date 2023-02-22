import { handleApiRequest } from 'Utils/handleApiRequest';

export const SET_CREW_EMPLOYEES = 'SET_CREW_EMPLOYEES';
export const FETCHING_CREW_EMPLOYEES = 'FETCHING_CREW_EMPLOYEES';
export const EMPLOYEES_ATTACHED = 'EMPLOYEES_ATTACHED';
export const ATTACHING_EMPLOYEES = 'ATTACHING_EMPLOYEES';
export const SET_PROJECT_MEMBERS = 'SET_PROJECT_MEMBERS';
export const FETCHING_PROJECT_MEMBERS = 'FETCHING_PROJECT_MEMBERS';
export const EMPLOYEE_REMOVED = 'EMPLOYEE_REMOVED';
export const REMOVING_EMPLOYEE = 'REMOVING_EMPLOYEE';

interface ActionTypes {
  SET_CREW_EMPLOYEES: any;
  FETCHING_CREW_EMPLOYEES: boolean;
  EMPLOYEES_ATTACHED: boolean;
  ATTACHING_EMPLOYEES: boolean;
  SET_PROJECT_MEMBERS: any;
  FETCHING_PROJECT_MEMBERS: boolean;
  EMPLOYEE_REMOVED: boolean;
  REMOVING_EMPLOYEE: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type SetCrewTypes = MessageAction;

/*
 * NON ASYNC THUNKS
 * */

export const setEmployeesAttached = (value: any) => (dispatch) => {
  dispatch({
    type: EMPLOYEES_ATTACHED,
    payload: value,
  });
};

export const setAttachingEmployees = (value: any) => (dispatch) => {
  dispatch({
    type: ATTACHING_EMPLOYEES,
    payload: value,
  });
};

export const setEmployeeRemoved = (value: any) => (dispatch) => {
  dispatch({
    type: EMPLOYEE_REMOVED,
    payload: value,
  });
};

/* eslint-disable */
export const listEmployees =
  (companyId: number, userId: number, search = '') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`companies/${companyId}/users`, {
        params: {
          'filter[search]': search,
          include: 'roles',
        },
      }),
      '',
      FETCHING_CREW_EMPLOYEES
    );

    if (response?.data) {
      const { data } = response;
      dispatch({
        type: SET_CREW_EMPLOYEES,
        payload: {
          data,
          userId,
        },
      });
    }
  };

export const syncEmployeeToProject =
  (projectId: number, userId: string, last: boolean) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.post(`projects/${projectId}/users/${userId}`, {}));

    if (typeof response === 'string') {
      if (last) {
        dispatch(setAttachingEmployees(false));
        dispatch(setEmployeesAttached(true));
      }
    } else {
      if (last) {
        dispatch(setAttachingEmployees(false));
      }
    }
  };

export const listProjectMembers =
  (projectId: number, userId: number, page = 1) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`projects/${projectId}/users`, {
        params: {
          limit: 100,
          page,
          include: 'roles',
        },
      }),
      '',
      FETCHING_PROJECT_MEMBERS
    );

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: SET_PROJECT_MEMBERS,
        payload: {
          data,
          userId,
        },
      });
    }
  };

export const removeEmployeeFromProject =
  (projectId: number, userId: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.delete(`projects/${projectId}/users/${userId}`),
      '',
      REMOVING_EMPLOYEE
    );

    if (typeof response === 'string') {
      dispatch(setEmployeeRemoved(true));
    }
  };
