/* eslint-disable */
import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';

export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const SET_EMPLOYEE_SELECTED = 'SET_EMPLOYEE_SELECTED';
export const FETCHING_COMPANY_EMPLOYEES = 'FETCHING_COMPANY_EMPLOYEES';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const EMPLOYEE_DELETED = 'EMPLOYEE_DELETED';
export const EMPLOYEE_UPDATED = 'EMPLOYEE_UPDATED';

interface ActionTypes {
  SET_EMPLOYEES: object;
  SET_EMPLOYEE_SELECTED: object;
  FETCHING_COMPANY_EMPLOYEES: boolean;
  DELETE_EMPLOYEE: string;
  EMPLOYEE_DELETED: boolean;
  EMPLOYEE_UPDATED: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type employeesActionTypes = MessageAction;

export const listCompanyEmployees =
  (companyId: string, userId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    // we'll enable the spinner
    setFetchingEmployees(true);

    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`/companies/${companyId}/users`, {
        params: {
          sort: 'first_name',
          include: 'phones,roles',
          limit: 100,
        },
      })
    );

    if (response?.data) {
      dispatch({
        type: SET_EMPLOYEES,
        payload: { ...response, userId },
      });
    } else {
      // we'll disable the spinner if something goes wrong with the API
      setFetchingEmployees(false);
    }
  };

export const deleteEmployee =
  (companyId: string, id: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    // Ensure we have an id
    if (id) {
      const response = await handleApiRequest(dispatch, utils.Api.delete(`/companies/${companyId}/users/${id}`, {}));
      if (typeof response === 'string') {
        dispatch(setDeletedEmployee(id));
      }
    }
  };
export const detachRoleFromEmployee =
  (companyId: string, id: string, roleId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    if (id) {
      const response = await handleApiRequest(
        dispatch,
        utils.Api.delete(`/companies/${companyId}/users/${id}/roles/${roleId}`, {})
      );
      if (typeof response === 'string') {
        dispatch(updateEmployeeRole(true));
      }
    }
  };

export const syncRoleToEmployee =
  (companyId: string, id: string, roleId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    if (id) {
      const response = await handleApiRequest(
        dispatch,
        utils.Api.post(`/companies/${companyId}/users/${id}/roles/${roleId}`, {})
      );
      if (typeof response === 'string') {
        dispatch(updateEmployeeRole(true));
      }
    }
  };

/*
 * NON API THUNKS
 * */

export const setEmployeeSelected = (selected: object) => async (dispatch: any) => {
  dispatch({
    type: SET_EMPLOYEE_SELECTED,
    payload: selected,
  });
};

export const setFetchingEmployees = (value: boolean) => (dispatch) => {
  dispatch({
    type: FETCHING_COMPANY_EMPLOYEES,
    payload: value,
  });
};

export const setDeletedEmployee =
  (value = '') =>
  async (dispatch: any) => {
    dispatch({
      type: EMPLOYEE_DELETED,
      payload: value,
    });
  };

export const updateEmployeeRole = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: EMPLOYEE_UPDATED,
    payload: value,
  });
};
