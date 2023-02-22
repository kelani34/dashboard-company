export const companyPhonesSelector = ({ company: { companyPhones: value = [] } }: any) => value;

export const companyPhoneCreatedSelector = ({ company: { companyPhoneCreated: value = false } }: any) => value;
export const companyAddressCreatedSelector = ({ company: { companyAddressCreated: value = false } }: any) => value;

export const companyUpdatedSelector = ({ company: { companyUpdated: value = false } }: any) => value;
export const companyAddressUpdatedSelector = ({ company: { companyAddressUpdated: value = false } }: any) => value;
export const companyPhoneUpdatedSelector = ({ company: { companyPhoneUpdated: value = false } }: any) => value;

export const companyLogoUploading = ({ company: { logoUploading: value = false } }) => value;
export const fetchingPhotoCategoriesSelector = ({ company: { fetchingPhotoCategories: value = true } }) => value;
export const photoCategoriesSelector = ({ company: { photoCategories: value = [] } }) => value;
export const photoCategoriesUpdatedSelector = ({ company: { photoCategoriesUpdated: value = false } }) => value;

// form errors
export const companyNameErrorSelector = ({ company: { companyUpdateErrors } }: any) => companyUpdateErrors?.name || [];
export const companyPhoneErrorSelector = ({ company: { companyPhoneUpdateErrors } }: any) =>
  companyPhoneUpdateErrors?.value || [];
export const companyWebsiteErrorSelector = ({ company: { companyUpdateErrors } }: any) =>
  companyUpdateErrors?.website || [];
export const companyAddressErrorSelector = ({ company: { companyAddressUpdateErrors } }: any) =>
  companyAddressUpdateErrors?.address || [];
export const companyAddressSecondErrorSelector = ({ company: { companyAddressUpdateErrors } }: any) =>
  companyAddressUpdateErrors?.address_2 || [];
export const companyCountryErrorSelector = ({ company: { companyAddressUpdateErrors } }: any) =>
  companyAddressUpdateErrors?.country || [];
export const companyStateErrorSelector = ({ company: { companyAddressUpdateErrors } }: any) =>
  companyAddressUpdateErrors?.state || [];
export const companyCityErrorSelector = ({ company: { companyAddressUpdateErrors } }: any) =>
  companyAddressUpdateErrors?.city || [];
export const companyCodeErrorSelector = ({ company: { companyAddressUpdateErrors } }: any) =>
  companyAddressUpdateErrors?.zip || [];
