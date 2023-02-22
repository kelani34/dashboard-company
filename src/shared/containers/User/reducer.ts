// types
import {
  FIRST_COMPANY_ID,
  SET_USER_COMPANY,
  SET_USER_DETAILS,
  SET_USER_STATUS,
  SET_USER_VERIFICATION,
  SetUserTypes,
  USER_COMPANIES,
  USER_PHONES,
  USER_UPDATE_ERRORS,
  SET_AVATAR_UPLOADING,
  REFRESH_AVATAR,
  SET_USER_PHONE_DETAILS,
  SET_USER_FEATURE_FLAGS,
  SET_COMPANY_EMPLOYEE_ROLES,
} from 'Containers/User/actions';

// state
const initialState = {
  user: {},
  userStatus: '',
  userPhones: {},
  userCompanies: {},
  firstCompanyId: '',
  userCompany: {},
  userVerifications: {
    authenticated: false,
    sms: false,
    company: false,
    approved: false,
    isNew: false,
  },
  avatarUploading: false,
  refreshAvatar: false,
  userPhoneDetails: {},
  userFeatureFlags: {
    companyApprove: false,
    rocketscanDamages: false,
    projectLossInfo: false,
    rocketReports: false,
    rocketDryReports: false,
  },
  companyEmployeeRoles: [],
};

export const UserReducer = (state = initialState, action: SetUserTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        user: payload,
      };
    case SET_USER_STATUS:
      return {
        ...state,
        userStatus: payload,
      };
    case USER_PHONES:
      return {
        ...state,
        userPhones: payload,
      };
    case USER_COMPANIES:
      return {
        ...state,
        userCompanies: payload,
      };
    case FIRST_COMPANY_ID:
      return {
        ...state,
        firstCompanyId: payload,
      };
    case SET_USER_COMPANY:
      return {
        ...state,
        userCompany: payload,
      };
    case SET_USER_VERIFICATION:
      return {
        ...state,
        userVerifications: payload,
      };
    case USER_UPDATE_ERRORS:
      return {
        ...state,
        userUpdateErrors: payload,
      };
    case SET_AVATAR_UPLOADING:
      return {
        ...state,
        avatarUploading: payload,
      };
    case REFRESH_AVATAR:
      return {
        ...state,
        refreshAvatar: payload,
      };
    case SET_USER_PHONE_DETAILS:
      return {
        ...state,
        userPhoneDetails: payload,
      };
    case SET_USER_FEATURE_FLAGS:
      const {
        company_approve: companyApprove,
        rocketscan_damages: rocketscanDamages,
        project_loss_info: projectLossInfo,
        rocket_reports: rocketReports,
        rocket_dry_reports: rocketDryReports,
      } = payload.values;
      return {
        ...state,
        userFeatureFlags: {
          companyApprove,
          rocketscanDamages,
          projectLossInfo,
          rocketReports,
          rocketDryReports,
        },
      };
    case SET_COMPANY_EMPLOYEE_ROLES:
      return {
        ...state,
        companyEmployeeRoles: payload,
      };
    default:
      return state;
  }
};
