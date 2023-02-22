/* eslint-disable */

import { CompanyModal } from 'Containers/Projects/Modals/CompanyProjectsModal/CompanyProjectsModal';
import { UserPhonesData } from 'Containers/User/Models/UserPhonesModel/UserPhonesModel';

export type UserModel = {
  readonly id: number;
  avatar_url: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  hasCompanies?: boolean;
  isCompanyAdmin: boolean;
  phone?: string;
  avatar?: string;
  companies: Array<CompanyModal>;
  phones: Array<UserPhonesData>;
  roles: Array<UserRoleModal>;

  /*
   * system variables
   */
  email_notifications?: boolean;
  sms_notifications?: boolean;
  desktop_notifications?: boolean;
  location_service?: boolean;
  created_at: string;
};

export type UserRoleModal = {
  readonly id: number;
  name: string;
  description: string;
  display_name: string;
};
