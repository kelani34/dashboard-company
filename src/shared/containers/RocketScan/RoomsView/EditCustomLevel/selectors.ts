export const customLevelUpdatedSelector = ({ customLevel: { customLevelUpdated: value = false } }: any) => value;
export const customLevelDeletedSelector = ({ customLevel: { customLevelDeleted: value = false } }: any) => value;
export const editingCustomLevelSelector = ({ customLevel: { editingCustomLevel: value = false } }: any) => value;

// errors
export const nameErrorSelector = ({ customLevel: { editCustomLevelErrors } }: any) => editCustomLevelErrors?.name || [];
export const levelErrorSelector = ({ customLevel: { editCustomLevelErrors } }: any) =>
  editCustomLevelErrors?.level || [];
