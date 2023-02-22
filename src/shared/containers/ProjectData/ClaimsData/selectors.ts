export const claimsSelector = ({ claims: { claims: value = [] } }: any) => value;
export const claimsTypesSelector = ({ claims: { claimTypes: value = [] } }: any) => value;

export const claimCreatedSelector = ({ claims: { claimCreated: value = false } }: any) => value;
export const claimUpdatedSelector = ({ claims: { claimUpdated: value = false } }: any) => value;
export const unitClaimCreatedSelector = ({ locations: { locationClaimCreated: value = false } }: any) => value;
export const claimDeletedSelector = ({ claims: { claimDeleted: value = false } }: any) => value;

// form errors
export const policyHolderErrorSelector = ({ claims: { claimCreateErrors } }: any) =>
  claimCreateErrors?.policy_holder || [];
export const representativeErrorSelector = ({ claims: { claimCreateErrors } }: any) =>
  claimCreateErrors?.representative || [];
export const policyNumberErrorSelector = ({ claims: { claimCreateErrors } }: any) =>
  claimCreateErrors?.policy_number || [];
export const claimNumberErrorSelector = ({ claims: { claimCreateErrors } }: any) =>
  claimCreateErrors?.claim_number || [];
export const claimTypeErrorSelector = ({ claims: { claimCreateErrors } }: any) =>
  claimCreateErrors?.claim_type_id || [];
