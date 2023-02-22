import {
  CONTACT_CREATED,
  CONTACT_DELETED,
  CONTACT_EDITED,
  contactsActionTypes,
  FETCHING_COMPANY_CONTACTS,
  PHONE_RECORD,
  RECENTLY_ADDED,
  SET_CONTACT_FORM_MODE,
  SET_CONTACT_TYPE_ICON,
  SET_CONTACT_TYPES,
  SET_CONTACTS,
  SET_DELETE_CONTACT_MODAL,
  SET_SELECTED_CONTACT,
  PHONE_RECORD_EDITED,
} from 'Containers/People/PeopleTabs/ContactsTab/actions';
import { formatPhone, getFirstLetterUppercase } from 'Utils/helpers';

const initialState = {
  contactsInitials: [],
  totalContacts: 0,
  contactTypes: [],
  contactCreated: false,
  contactTypeIcon: 'personpurple',
  fetchingCompanyContacts: true,
  recentlyAdded: undefined,
  phoneRecord: undefined,
  selectedContact: undefined,
  contactEdited: false,
  contactFormMode: 'create',
  showDeleteContactModal: false,
  contactDeleted: false,
  phoneRecordEdited: false,
};

export const contactsReducer = (state = initialState, action: contactsActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CONTACTS: {
      const {
        data: contacts,
        meta: { total: totalContacts },
      } = payload;
      let contactsInitials = [];

      if (contacts.length > 0) {
        contactsInitials = Object.values(
          contacts.reduce((items, contact) => {
            // variables
            let phone = '';
            let extension = '';
            let phoneId = '';
            let contactTypeId = '';
            let contactTypeName = '';

            // create custom variables
            const {
              id,
              first_name: firstName,
              last_name: lastName,
              full_name: fullName,
              company_name: companyName,
              is_company: isCompany,
              phones,
              email,
              contact_type: contactType,
            } = contact;

            // set phone and extension
            if (phones.length > 0) {
              const [firstPhone] = phones;
              const { id, value, extension: ext } = firstPhone;

              phone = formatPhone(value);
              extension = ext;
              phoneId = id;
            }

            if (contactType) {
              const { id, name } = contactType;

              contactTypeId = id;
              contactTypeName = name;
            }

            // set out initial letter
            let initial = getFirstLetterUppercase(fullName);

            // if the contact is a company
            if (isCompany) {
              initial = getFirstLetterUppercase(companyName);
            }

            // if a initial is not exists in the array we'll set the initial and contacts object
            if (!items[initial]) {
              items[initial] = {
                initial,
                contacts: [],
              };
            }

            // finally we'll assign each contact to their respective initial group
            items[initial].contacts.push({
              id,
              firstName,
              lastName,
              fullName,
              companyName,
              isCompany,
              phone,
              phoneId,
              extension,
              email,
              contactTypeId,
              contactTypeName,
            });

            return items;
          }, [])
        );
      }

      return {
        ...state,
        contactsInitials,
        totalContacts, // set total to show or hide the placeholders
        fetchingCompanyContacts: false, // we'll hide the spinner once everything processed
      };
    }
    case SET_CONTACT_TYPES:
      return {
        ...state,
        contactTypes: payload,
      };
    case CONTACT_CREATED:
      return {
        ...state,
        contactCreated: payload,
      };
    case SET_CONTACT_TYPE_ICON:
      return {
        ...state,
        contactTypeIcon: payload,
      };
    case FETCHING_COMPANY_CONTACTS:
      return {
        ...state,
        fetchingCompanyContacts: payload,
      };
    case RECENTLY_ADDED:
      return {
        ...state,
        recentlyAdded: payload,
      };
    case PHONE_RECORD:
      return {
        ...state,
        phoneRecord: payload,
      };
    case SET_SELECTED_CONTACT:
      return {
        ...state,
        selectedContact: payload,
      };
    case CONTACT_EDITED:
      return {
        ...state,
        contactEdited: payload,
      };
    case SET_CONTACT_FORM_MODE:
      return {
        ...state,
        contactFormMode: payload,
      };
    case SET_DELETE_CONTACT_MODAL:
      return {
        ...state,
        showDeleteContactModal: payload,
      };
    case CONTACT_DELETED:
      return {
        ...state,
        contactDeleted: payload,
      };
    case PHONE_RECORD_EDITED:
      return {
        ...state,
        phoneRecordEdited: payload,
      };
    default:
      return state;
  }
};
