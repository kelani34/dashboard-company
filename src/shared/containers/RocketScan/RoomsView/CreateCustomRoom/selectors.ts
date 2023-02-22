export const customRoomCreatedSelector = ({ customRoom: { customRoomCreated: value = false } }: any) => value;
export const customRoomUpdatedSelector = ({ customRoom: { customRoomUpdated: value = false } }: any) => value;
export const customRoomDeletedSelector = ({ customRoom: { customRoomDeleted: value = false } }: any) => value;

// errors
export const nameErrorSelector = ({ core: { formErrors } }: any) => formErrors?.name || [];
