import { formatPhone, getFirstLetterUppercase } from 'Utils/helpers';
import {
  SET_EMPLOYEES,
  SET_EMPLOYEE_SELECTED,
  EMPLOYEE_DELETED,
  FETCHING_COMPANY_EMPLOYEES,
  employeesActionTypes,
} from './actions';

const initialState = {
  employeesInitials: [],
  totalEmployees: 0,
  selectedEmployee: {},
  employeeCreated: false,
  fetchingCompanyEmployees: true,
  employeeDeleted: '',
};

export const employeesReducer = (state = initialState, action: employeesActionTypes) => {
  const { type, payload } = action;
  switch (type) {
    case SET_EMPLOYEES: {
      const {
        userId,
        data: employees,
        meta: { total: totalEmployees },
      } = payload;
      let employeesInitials = [];

      if (employees.length > 0) {
        employeesInitials = Object.values(
          employees.reduce((items, employee) => {
            const {
              id,
              first_name: firstName,
              last_name: lastName,
              full_name: fullName,
              phones,
              email,
              avatar_url: avatar,
              roles,
            } = employee;

            if (userId !== id) {
              // get employee initial
              const initial = getFirstLetterUppercase(firstName);

              if (!items[initial]) {
                items[initial] = {
                  initial,
                  employees: [],
                };
              }

              let primaryPhone = '';
              let primaryPhoneExtension = '';
              let phoneId = '';

              if (phones.length > 0) {
                const [firstPhone] = phones;
                const { id, value, extension } = firstPhone;

                primaryPhone = formatPhone(value);
                primaryPhoneExtension = extension;
                phoneId = id;
              }

              items[initial].employees.push({
                id,
                firstName,
                lastName,
                fullName,
                phones,
                phoneId,
                primaryPhone,
                primaryPhoneExtension,
                email,
                roles,
                avatar: avatar || '',
              });
            }

            return items;
          }, [])
        );
      }

      return {
        ...state,
        employeesInitials,
        totalEmployees, // set total to show or hide the placeholders
        fetchingCompanyEmployees: false, // we'll hide the spinner once everything processed
      };
    }

    case SET_EMPLOYEE_SELECTED:
      return {
        ...state,
        selectedEmployee: payload,
      };

    case FETCHING_COMPANY_EMPLOYEES:
      return {
        ...state,
        fetchingCompanyEmployees: payload,
      };

    case EMPLOYEE_DELETED:
      return {
        ...state,
        employeeDeleted: payload,
      };
    default:
      return state;
  }
};
