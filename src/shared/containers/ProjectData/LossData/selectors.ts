export const projectDamageTypesSelector = ({ lossData: { projectDamageTypes: value = [] } }: any) => value;
export const propertyLocationsSelector = ({ lossData: { locations: value = [] } }: any) => value;
export const fetchingLocationsSelector = ({ lossData: { fetchingLocations: value = true } }) => value;
export const propertyDamageTypesSelector = ({ lossData: { propertyDamageTypes: value = [] } }: any) => value;
export const customDamageTypeCreatedSelector = ({ lossData: { customDamageTypeCreated: value = false } }) => value;
export const customDamageTypeUpdatedSelector = ({ lossData: { customDamageTypeUpdated: value = false } }) => value;
export const customDamageTypeDeletedSelector = ({ lossData: { customDamageTypeDeleted: value = false } }) => value;
export const projectDamageCausesSelector = ({ lossData: { projectDamageCauses: value = [] } }: any) => value;
export const propertyLossDataUpdatedSelector = ({ lossData: { propertyLossDataUpdated: value = false } }) => value;
export const affectedLocationRoomsSelector = ({ lossData: { affectedLocationRooms: value = [] } }) => value;
export const affectedLocationUpdatedSelector = ({ lossData: { affectedLocationUpdated: value = false } }) => value;
export const roomSourceStatusUpdatedSelector = ({ lossData: { roomSourceStatusUpdated: value = false } }) => value;
export const locationDamageTypesSelector = ({ lossData: { locationDamageTypes: value = [] } }) => value;

// errors
export const nameErrorSelector = ({ core: { formErrors } }: any) => formErrors?.name || [];
