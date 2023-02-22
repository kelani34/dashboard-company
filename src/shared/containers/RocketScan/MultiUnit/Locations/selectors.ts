export const locationTypesSelector = ({ locations: { locationTypes: value = [] } }) => value;
export const locationSelector = ({ locations: { location: value } }) => value;
export const fetchingLocationRoomsSelector = ({ locations: { fetchingLocationRooms: value = false } }) => value;
export const locationRoomCreatedSelector = ({ locations: { locationRoomCreated: value = false } }) => value;
export const locationCreatedSelector = ({ locations: { locationCreated: value = false } }) => value;
export const locationDeletedSelector = ({ locations: { locationDeleted: value = false } }) => value;
export const locationsSelector = ({ locations: { locations: value = [] } }) => value;
export const fetchingLocationsSelector = ({ locations: { fetchingLocations: value = true } }) => value;
export const currentPageSelector = ({ locations: { currentPage: value = 1 } }) => value;
export const lastPageSelector = ({ locations: { lastPage: value = 1 } }) => value;
export const refreshLocationsSelector = ({ locations: { refreshLocations: value = false } }) => value;
export const exteriorLocationSelector = ({ locations: { exteriorLocation: value } }) => value;
export const multiUnitExteriorLocationCreatedSelector = ({ locations: { multiUnitExteriorLocationCreated: value } }) =>
  value;
export const locationClaimsSelector = ({ locations: { locationClaims: value = [] } }) => value;
export const locationClaimSelector = ({ locations: { locationClaim: value } }) => value;

// form errors
export const nameErrorSelector = ({ core: { formErrors } }: any) => formErrors?.name || [];
export const floorErrorSelector = ({ core: { formErrors } }: any) => formErrors?.floor_number || [];
export const nameEditErrorSelector = ({ locations: { formErrors } }: any) => formErrors?.name || [];
export const floorEditErrorSelector = ({ locations: { formErrors } }: any) => formErrors?.floor_number || [];

export const unitClaimCreateErrorSelector = ({ locations: { locationClaimCreateErrors } }: any) =>
  locationClaimCreateErrors?.location || [];
export const policyHolderErrorSelector = ({ locations: { locationClaimCreateErrors } }: any) =>
  locationClaimCreateErrors?.policy_holder || [];
export const representativeErrorSelector = ({ locations: { locationClaimCreateErrors } }: any) =>
  locationClaimCreateErrors?.representative || [];
export const policyNumberErrorSelector = ({ locations: { locationClaimCreateErrors } }: any) =>
  locationClaimCreateErrors?.policy_number || [];
export const claimNumberErrorSelector = ({ locations: { locationClaimCreateErrors } }: any) =>
  locationClaimCreateErrors?.claim_number || [];
export const claimTypeErrorSelector = ({ locations: { locationClaimCreateErrors } }: any) =>
  locationClaimCreateErrors?.claim_type_id || [];
