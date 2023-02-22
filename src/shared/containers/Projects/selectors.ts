// company related selectors
export const firstCompanyIdSelector = ({ user: { firstCompanyId: value = '' } }: any) => value;

// project related selector
export const projectStatusesSelector = ({ projects: { projectStatuses: value = [] } }: any) => value;
export const projectCreatedSelector = ({ projects: { projectCreated: value } }: any) => value;

// download project photos selector
export const photoDownloadProjectSelector = ({ projects: { photoDownloadProject: value = undefined } }: any) => value;
export const preparingPhotoDownloadSelector = ({ projects: { preparingPhotoDownload: value = false } }: any) => value;

// create project form related selectors
export const placeIdSelector = ({
  address: {
    addressRequest: { google_places_id: value = '' },
  },
}: any) => value;
export const countrySelector = ({
  address: {
    addressRequest: { country: value = '' },
  },
}: any) => value;
export const stateSelector = ({
  address: {
    addressRequest: { state: value = '' },
  },
}: any) => value;
export const citySelector = ({
  address: {
    addressRequest: { city: value = '' },
  },
}: any) => value;
export const zipSelector = ({
  address: {
    addressRequest: { zip: value = '' },
  },
}: any) => value;
export const streetAddressSelector = ({
  address: {
    addressRequest: { address: value = '' },
  },
}: any) => value;
export const unitSelector = ({
  address: {
    addressRequest: { addressTwo: value = '' },
  },
}: any) => value;
export const latitudeSelector = ({
  address: {
    addressRequest: { latitude: value = '' },
  },
}: any) => value;
export const longitudeSelector = ({
  address: {
    addressRequest: { longitude: value = '' },
  },
}: any) => value;

// create project form error selectors
export const countryErrorSelector = ({ core: { formErrors } }: any) => formErrors?.country || [];
export const stateErrorSelector = ({ core: { formErrors } }: any) => formErrors?.state || [];
export const cityErrorSelector = ({ core: { formErrors } }: any) => formErrors?.city || [];
export const zipErrorSelector = ({ core: { formErrors } }: any) => formErrors?.zip || [];
export const addressErrorSelector = ({ core: { formErrors } }: any) => formErrors?.address || [];
export const unitErrorSelector = ({ core: { formErrors } }: any) => formErrors?.address_2 || [];

// my projects selector
export const myProjectsSelector = ({ projects }: any) => projects?.myProjects || {};

// fetching selectors
export const fetchingMyProjectsSelector = ({ projects }: any) => projects?.fetchingMyProjects || false;
export const fetchingPhotoDownloadSelector = ({ projects }: any) => projects?.fetchingPhotoDownload || false;

// indicator that project info has been cleared
export const projectInfoClearedSelector = ({ projects }: any) => projects?.projectInfoCleared || false;
