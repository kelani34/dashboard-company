export const employeesSelector = ({ crew: { employees: value = [] } }: any) => value;
export const fetchingCrewEmployeesSelector = ({ crew: { fetchingCrewEmployees: value = true } }: any) => value;
export const employeesAttachedSelector = ({ crew: { employeesAttached: value = false } }: any) => value;
export const attachingEmployeesSelector = ({ crew: { attachingEmployees: value = false } }: any) => value;
export const membersSelector = ({ crew: { members: value = [] } }: any) => value;
export const fetchingMembersSelector = ({ crew: { fetchingMembers: value = true } }: any) => value;
export const employeeRemovedSelector = ({ crew: { employeeRemoved: value } }: any) => value;
export const removingEmployeeSelector = ({ crew: { removingEmployee: value = true } }: any) => value;
