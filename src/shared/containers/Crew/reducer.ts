import {
  ATTACHING_EMPLOYEES,
  EMPLOYEE_REMOVED,
  EMPLOYEES_ATTACHED,
  FETCHING_CREW_EMPLOYEES,
  FETCHING_PROJECT_MEMBERS,
  REMOVING_EMPLOYEE,
  SET_CREW_EMPLOYEES,
  SET_PROJECT_MEMBERS,
  SetCrewTypes,
} from 'Containers/Crew/actions';

const initialState = {
  employees: [],
  fetchingCrewEmployees: true,
  employeesAttached: false,
  attachingEmployees: false,
  members: [],
  fetchingMembers: true,
  employeeRemoved: undefined,
  removingEmployee: false,
};

export const crewReducer = (state = initialState, action: SetCrewTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CREW_EMPLOYEES: {
      const { userId, data: employees } = payload;

      return {
        ...state,
        employees: employees.filter(({ id }: any) => id !== userId), // removing the current user
      };
    }
    case FETCHING_CREW_EMPLOYEES:
      return {
        ...state,
        fetchingCrewEmployees: payload,
      };
    case EMPLOYEES_ATTACHED:
      return {
        ...state,
        employeesAttached: payload,
      };
    case ATTACHING_EMPLOYEES:
      return {
        ...state,
        attachingEmployees: payload,
      };
    case SET_PROJECT_MEMBERS: {
      const { userId, data: members } = payload;

      return {
        ...state,
        members: members.filter(({ id }: any) => id !== userId), // removing the current user
      };
    }
    case FETCHING_PROJECT_MEMBERS:
      return {
        ...state,
        fetchingMembers: payload,
      };
    case EMPLOYEE_REMOVED:
      return {
        ...state,
        employeeRemoved: payload,
      };
    case REMOVING_EMPLOYEE:
      return {
        ...state,
        removingEmployee: payload,
      };
    default:
      return state;
  }
};
