export const customLevelCreatedSelector = ({ customLevel: { customLevelCreated: value = false } }: any) => value;
export const creatingCustomLevelSelector = ({ customLevel: { creatingCustomLevel: value = false } }: any) => value;

// errors
export const nameErrorSelector = ({ customLevel: { createCustomLevelErrors } }: any) =>
  createCustomLevelErrors?.name || [];
