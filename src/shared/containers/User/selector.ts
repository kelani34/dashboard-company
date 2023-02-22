import { UserModel } from 'Containers/User/Models/UserModel';

export const userSelector = ({ user: { user: value = <UserModel>{} } }: any) => value;
export const userCompanySelector = ({ user: { userCompany: value = {} } }: any) => value;
export const userVerificationsSelector = ({
  user: {
    userVerifications: value = {
      authenticated: false,
      sms: false,
      company: false,
      approved: false,
    },
  },
}: any) => value;

export const userPhoneDetailsSelector = ({ user: { userPhoneDetails: value = {} } }: any) => value;

export const userAvatarUploading = ({ user: { avatarUploading: value = false } }) => value;

export const userUpdatedSelector = ({ userInformation: { userUpdated: value = false } }: any) => value;

export const userPhoneUpdatedSelector = ({ phoneVerification: { userPhoneUpdated: value = false } }: any) => value;

export const userFeatureFlagsSelector = ({
  user: {
    userFeatureFlags: value = {
      companyApprove: false,
      rocketscanDamages: false,
      projectLossInfo: false,
      rocketReports: false,
      rocketDryReports: false,
    },
  },
}: any) => value;

// form errors
export const firstNameErrorSelector = ({ user: { userUpdateErrors } }: any) => userUpdateErrors?.first_name || [];
export const lastNameErrorSelector = ({ user: { userUpdateErrors } }: any) => userUpdateErrors?.last_name || [];
export const emailErrorSelector = ({ user: { userUpdateErrors } }: any) => userUpdateErrors?.email || [];
export const phoneErrorSelector = ({ core: { formErrors } }: any) => formErrors?.value || [];
export const extensionErrorSelector = ({ user: { userUpdateErrors } }: any) => userUpdateErrors?.extension || [];
export const companyEmployeeRolesSelector = ({ user: { companyEmployeeRoles: value = [] } }: any) => value;
