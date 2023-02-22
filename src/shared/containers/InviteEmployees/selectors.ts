export const sendInviteSelector = ({ employeeInvite: { sent: value = false } }) => value;
export const emailInviteLinkSelector = ({ employeeInvite: { emailInviteLink: value = '' } }) => value;

export const emailErrorSelector = ({ core: { formErrors } }: any) => formErrors?.email || [];
