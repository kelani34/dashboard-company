export const selectedReportLocationsSelector = ({ reports: { selectedReportLocations: value = [] } }) => value;
export const reportCreatingSelector = ({ reports: { reportCreating: value = false } }) => value;
export const reportCreatedSelector = ({ reports: { reportCreated: value = false } }) => value;
export const reportDeletedSelector = ({ reports: { reportDeleted: value = false } }) => value;
export const reportSharingSelector = ({ reports: { reportSharing: value = false } }) => value;
export const reportSharedSelector = ({ reports: { reportShared: value = false } }) => value;
export const reportsSelector = ({ reports: { reports: value } }) => value;

// form errors
export const titleErrorSelector = ({ reports: { errors } }) => errors?.name || [];
export const emailErrorSelector = ({ reports: { errors } }) => errors?.email || [];
