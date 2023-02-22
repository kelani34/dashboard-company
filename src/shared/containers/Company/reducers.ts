// types
import {
  SetCompanyTypes,
  COMPANY_UPDATED,
  COMPANY_PHONES,
  COMPANY_PHONE,
  COMPANY_PHONE_UPDATED,
  COMPANY_PHONE_CREATED,
  COMPANY_ADDRESS,
  COMPANY_ADDRESS_CREATED,
  COMPANY_ADDRESS_UPDATED,
  COMPANY_UPDATE_ERRORS,
  COMPANY_PHONE_UPDATE_ERRORS,
  COMPANY_ADDRESS_UPDATE_ERRORS,
  SET_LOGO_UPLOADING,
  REFRESH_LOGO,
  COMPANY_PHOTO_CATEGORIES,
  COMPANY_PHOTO_CATEGORIES_UPDATED,
  FETCHING_COMPANY_PHOTO_CATEGORIES,
} from 'Containers/Company/actions';

// state
const initialState = {
  companyUpdated: false,
  companyPhones: [],
  companyPhone: undefined,
  companyPhoneCreated: false,
  companyPhoneUpdated: false,
  companyAddress: undefined,
  companyAddressUpdated: false,
  companyAddressCreated: false,
  companyUpdateErrors: undefined,
  companyPhoneUpdateErrors: undefined,
  companyAddressUpdateErrors: undefined,
  logoUploading: false,
  refreshAvatar: false,
  fetchingPhotoCategories: false,
  photoCategories: [],
  photoCategoriesUpdated: false,
};

export const companyReducer = (state = initialState, action: SetCompanyTypes) => {
  const { type, payload } = action;
  switch (type) {
    case COMPANY_UPDATED:
      return {
        ...state,
        companyUpdated: payload,
      };
    case COMPANY_PHONES:
      return {
        ...state,
        companyPhones: payload,
      };
    case COMPANY_PHONE:
      return {
        ...state,
        companyPhone: payload,
      };
    case COMPANY_PHONE_UPDATED:
      return {
        ...state,
        companyPhoneUpdated: payload,
      };
    case COMPANY_PHONE_CREATED:
      return {
        ...state,
        companyPhoneCreated: payload,
      };
    case COMPANY_ADDRESS:
      return {
        ...state,
        companyAddress: payload,
      };
    case COMPANY_ADDRESS_UPDATED:
      return {
        ...state,
        companyAddressUpdated: payload,
      };
    case COMPANY_ADDRESS_CREATED:
      return {
        ...state,
        companyAddressCreated: payload,
      };
    case COMPANY_UPDATE_ERRORS:
      return {
        ...state,
        companyUpdateErrors: payload,
      };
    case COMPANY_PHONE_UPDATE_ERRORS:
      return {
        ...state,
        companyPhoneUpdateErrors: payload,
      };
    case COMPANY_ADDRESS_UPDATE_ERRORS:
      return {
        ...state,
        companyAddressUpdateErrors: payload,
      };
    case SET_LOGO_UPLOADING:
      return {
        ...state,
        logoUploading: payload,
      };
    case REFRESH_LOGO:
      return {
        ...state,
        refreshLogo: payload,
      };
    case FETCHING_COMPANY_PHOTO_CATEGORIES:
      return {
        ...state,
        fetchingPhotoCategories: payload,
      };
    case COMPANY_PHOTO_CATEGORIES:
      return {
        ...state,
        photoCategories: payload,
      };
    case COMPANY_PHOTO_CATEGORIES_UPDATED:
      return {
        ...state,
        photoCategoriesUpdated: payload,
      };
    default:
      return state;
  }
};
