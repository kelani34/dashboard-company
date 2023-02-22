// error selectors
export const bodyErrorSelector = ({ roomNotes: { formErrors } }: any) => formErrors?.body || [];
