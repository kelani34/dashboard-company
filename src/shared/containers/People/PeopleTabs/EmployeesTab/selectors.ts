/* eslint-disable */
export const employeesInitialsSelector = ({ employees: { employeesInitials: value = [] } }: any) => value;
export const totalEmployeesSelector = ({ employees: { totalEmployees: value = [] } }: any) => value;
export const fetchingCompanyEmployeesSelector = ({ employees: { fetchingCompanyEmployees: value = true } }: any) =>
  value;
export const selectedEmployeeSelector = ({
  employees: {
    selectedEmployee: { id = '', email = '', firstName = '', lastName = '', fullName = '', avatar = '', roles = [] },
  },
}) => ({
  id,
  email,
  firstName,
  lastName,
  fullName,
  avatar,
  roles,
});
export const employeeDeletedSelector = ({ employees: { employeeDeleted: value = '' } }: any) => value;
