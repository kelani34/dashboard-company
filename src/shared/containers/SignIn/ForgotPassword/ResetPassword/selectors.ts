export const emailErrorSelector = ({ core: { formErrors } }: any) => formErrors?.email || [];
export const tokenErrorSelector = ({ core: { formErrors } }: any) => formErrors?.token || [];
export const passwordErrorSelector = ({ core: { formErrors } }: any) => formErrors?.password || [];

export const redirectSelector = ({ resetPassword: { redirect } }) => redirect;
