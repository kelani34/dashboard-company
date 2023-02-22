export const tabSelector = ({ rocketScan: { selectedTab: value = 'dashboard' } }: any) => value;
export const projectIdSelector = ({ rocketScan: { projectId: value = '' } }: any) => value;
export const projectCompanyIdSelector = ({ rocketScan: { projectCompanyId: value = '' } }: any) => value;
export const locationIdSelector = ({ rocketScan: { locationId: value = '' } }: any) => value;
export const photoIdSelector = ({ rocketScan: { photoId: value = '' } }: any) => value;
export const projectAddressSelector = ({ rocketScan: { projectAddress: value = '' } }: any) => value;
export const projectSelector = ({ rocketScan: { project: value } }: any) => value;
export const projectAliasSelector = ({ rocketScan: { projectAlias: value } }: any) => value;
export const projectHasNewDamageTypesSelector = ({ rocketScan: { projectHasNewDamageTypes: value = true } }: any) =>
  value;
export const projectTypesSelector = ({ rocketScan: { projectTypes: value = [] } }: any) => value;
export const propertySelector = ({ rocketScan: { property: value } }: any) => value;
export const propertyTypesSelector = ({ rocketScan: { propertyTypes: value = [] } }: any) => value;
export const roomTypesSelector = ({ rocketScan: { roomTypes: value = [] } }: any) => value;
export const selectedPhotoFilterSelector = ({ rocketScan: { selectedPhotoFilter: value = 0 } }) => value;
export const albumTypesSelector = ({ rocketScan: { albumTypes: value = [] } }: any) => value;
export const fetchingProjectSelector = ({ rocketScan: { fetchingProject: value } }: any) => value;
export const defaultRoomLevelIdSelector = ({ rocketScan: { defaultRoomLevelId: value } }: any) => value;
export const defaultExteriorLevelIdSelector = ({ rocketScan: { defaultExteriorLevelId: value } }: any) => value;
export const fetchingLocationsSelector = ({ rocketScan: { fetchingLocations: value = true } }: any) => value;
export const unitRoomTypesSelector = ({ rocketScan: { unitRoomTypes: value = [] } }: any) => value;
export const commercialRoomTypesSelector = ({ rocketScan: { commercialRoomTypes: value = [] } }: any) => value;
export const floorRoomTypesSelector = ({ rocketScan: { floorRoomTypes: value = [] } }: any) => value;
export const exteriorLocationRoomTypesSelector = ({ rocketScan: { exteriorLocationRoomTypes: value = [] } }: any) =>
  value;
export const singleUnitExteriorRoomTypesSelector = ({ rocketScan: { singleUnitExteriorRoomTypes: value = [] } }: any) =>
  value;
export const multiUnitExteriorRoomTypesSelector = ({ rocketScan: { multiUnitExteriorRoomTypes: value = [] } }: any) =>
  value;
export const exteriorRoomTypesSelector = ({ rocketScan: { exteriorRoomTypes: value = [] } }: any) => value;
export const levelTypesSelector = ({ rocketScan: { levels: value = [] } }: any) => value;
export const singleLocationRoomTypeSelector = ({ rocketScan: { singleLocationRoomType: value = {} } }: any) => value;
export const industrialRoomTypesSelector = ({ rocketScan: { industrialRoomTypes: value = [] } }: any) => value;
export const industrialRoomLevelsSelector = ({ rocketScan: { industrialRoomLevels: value = [] } }: any) => value;
export const exteriorLevelsSelector = ({ rocketScan: { exteriorLevels: value = [] } }: any) => value;
export const damageTypesSelector = ({ rocketScan: { damageTypes: value = [] } }: any) => value;
export const damagedMaterialsSelector = ({ rocketScan: { damagedMaterials: value = [] } }: any) => value;
export const categoriesSelector = ({ rocketScan: { categories: value = [] } }: any) => value;
export const selectedCategoriesSelector = ({ rocketScan: { selectedCategories: value = [] } }: any) => value;
export const claimsSelector = ({ rocketScan: { claims: value = [] } }: any) => value;
export const projectUnavailableSelector = ({ rocketScan: { projectUnavailable: value = false } }: any) => value;
export const unitOfMeasurementTypesSelector = ({ rocketScan: { unitOfMeasurementTypes: value = [] } }: any) => value;
export const scopeActionTypesSelector = ({ rocketScan: { scopeActionTypes: value = [] } }: any) => value;
