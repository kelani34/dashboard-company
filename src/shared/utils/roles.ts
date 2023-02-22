import { UserRoleModal } from 'Containers/User/Models/UserModel/UserModel';

export const isCompanyAdmin = (roles: Array<UserRoleModal>) =>
  roles?.length > 0 ? roles.some(({ name }: UserRoleModal) => name.toLocaleLowerCase() === 'company-admin') : false;
