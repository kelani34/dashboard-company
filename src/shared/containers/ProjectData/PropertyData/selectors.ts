export const propertyDataSelector = ({ propertyData: { propertyData: value } }: any) => value;
export const propertyDataEditedSelector = ({ propertyData: { propertyDataEdited: value = false } }: any) => value;
export const asbestosStatusesSelector = ({ propertyData: { asbestosStatuses: value = [] } }: any) => value;

// form errors
export const yearBuiltErrorSelector = ({ propertyData: { editPropertyDataErrors } }: any) =>
  editPropertyDataErrors?.year_built || [];
export const buildingNameErrorSelector = ({ propertyData: { editPropertyDataErrors } }: any) =>
  editPropertyDataErrors?.name || [];
