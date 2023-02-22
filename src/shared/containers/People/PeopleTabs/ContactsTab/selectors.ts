export const contactsInitialsSelector = ({ contacts: { contactsInitials: value = [] } }: any) => value;
export const totalContactsSelector = ({ contacts: { totalContacts: vale = 0 } }: any) => vale;
export const contactTypesSelector = ({ contacts: { contactTypes: vale = [] } }: any) => vale;
export const contactCreatedSelector = ({ contacts: { contactCreated: vale = false } }: any) => vale;
export const contactTypeIconSelector = ({ contacts: { contactTypeIcon: vale = 'personpurple' } }: any) => vale;
export const fetchingCompanyContactsSelector = ({ contacts: { fetchingCompanyContacts: vale = true } }: any) => vale;
export const recentlyAddedSelector = ({ contacts: { recentlyAdded: vale } }: any) => vale;
export const phoneRecordSelector = ({ contacts: { phoneRecord: vale } }: any) => vale;
export const selectedContactSelector = ({ contacts: { selectedContact: vale } }: any) => vale;
export const contactEditedSelector = ({ contacts: { contactEdited: vale = false } }: any) => vale;
export const contactFormModeSelector = ({ contacts: { contactFormMode: vale = 'create' } }: any) => vale;
export const showDeleteContactModalSelector = ({ contacts: { showDeleteContactModal: vale = false } }: any) => vale;
export const contactDeletedSelector = ({ contacts: { contactDeleted: vale = false } }: any) => vale;
export const phoneRecordEditedSelector = ({ contacts: { phoneRecordEdited: value = false } }: any) => value;

// form errors
export const firstNameErrorSelector = ({ core: { formErrors } }: any) => formErrors?.first_name || [];
export const lastNameErrorSelector = ({ core: { formErrors } }: any) => formErrors?.last_name || [];
export const companyNameErrorSelector = ({ core: { formErrors } }: any) => formErrors?.company_name || [];
export const emailErrorSelector = ({ core: { formErrors } }: any) => formErrors?.email || [];
export const phoneErrorSelector = ({ core: { formErrors } }: any) => formErrors?.value || [];
export const extensionErrorSelector = ({ core: { formErrors } }: any) => formErrors?.extension || [];
export const contactTypeIdErrorSelector = ({ core: { formErrors } }: any) => formErrors?.contact_type_id || [];
