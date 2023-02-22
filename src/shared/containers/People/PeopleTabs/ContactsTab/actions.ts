/* eslint-disable */

import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';

export const SET_CONTACTS = 'SET_CONTACTS';
export const SET_CONTACT_TYPES = 'SET_CONTACT_TYPES';
export const CONTACT_CREATED = 'CONTACT_CREATED';
export const SET_CONTACT_TYPE_ICON = 'SET_CONTACT_TYPE_ICON';
export const FETCHING_COMPANY_CONTACTS = 'FETCHING_COMPANY_CONTACTS';
export const RECENTLY_ADDED = 'RECENTLY_ADDED';
export const PHONE_RECORD = 'PHONE_RECORD';
export const SET_SELECTED_CONTACT = 'SET_SELECTED_CONTACT';
export const CONTACT_EDITED = 'CONTACT_EDITED';
export const SET_CONTACT_FORM_MODE = 'SET_CONTACT_FORM_MODE';
export const SET_DELETE_CONTACT_MODAL = 'SET_DELETE_CONTACT_MODAL';
export const CONTACT_DELETED = 'CONTACT_DELETED';
export const PHONE_RECORD_EDITED = 'PHONE_RECORD_EDITED';

interface ActionTypes {
  SET_CONTACTS: any[];
  SET_CONTACT_TYPES: any[];
  CONTACT_CREATED: boolean;
  SET_CONTACT_TYPE_ICON: string;
  FETCHING_COMPANY_CONTACTS: boolean;
  RECENTLY_ADDED: number;
  PHONE_RECORD: any;
  SET_SELECTED_CONTACT: any;
  CONTACT_EDITED: boolean;
  SET_CONTACT_FORM_MODE: string;
  SET_DELETE_CONTACT_MODAL: boolean;
  CONTACT_DELETED: boolean;
  PHONE_RECORD_EDITED: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type contactsActionTypes = MessageAction;

export const listContactTypes =
  () =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get('contact-types'));

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: SET_CONTACT_TYPES,
        payload: data,
      });
    }
  };

export const createContact =
  (requestData) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.post('contacts', requestData));

    if (response?.data) {
      const {
        data: { id },
      } = response;
      const { phoneId } = requestData;

      dispatch(setRecentlyAdded(id.toString()));

      if (phoneId) {
        dispatch(attachPhoneRecord(id, phoneId));
      } else {
        dispatch(setContactCreated(true));
      }
    }
  };

export const editContact =
  (contactId: number, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.put(`contacts/${contactId}`, requestData));
    if (response?.data) {
      const {
        data: { id },
      } = response;
      const { phoneId } = requestData;

      if (phoneId) {
        dispatch(attachPhoneRecord(id, phoneId));
      } else {
        dispatch(setContactEdited(true));
      }
    }
  };

export const deleteContact =
  (contactId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.delete(`contacts/${contactId}`));
    if (typeof response === 'string') {
      dispatch(setContactDeleted(true));
    }
  };

export const createPhoneRecord =
  (requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.post('phones', requestData));

    if (response?.data) {
      const { data } = response;

      dispatch(setPhoneRecord(data));
    }
  };

export const editPhoneRecord =
  (phoneId: number, requestData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.put(`phones/${phoneId}`, requestData));

    if (response?.data) {
      const { data } = response;

      dispatch(setPhoneRecord(data));
      dispatch(setPhoneRecordEdited(true));
    }
  };

export const attachPhoneRecord =
  (contactId: number, phone: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`contacts/${contactId}/phones/${phone}`, { phone })
    );

    if (typeof response === 'string') {
      dispatch(setContactCreated(true));
      dispatch(setContactEdited(true));
    }
  };

export const listCompanyContacts =
  (companyId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    // we'll enable the spinner
    setFetchingContacts(true);

    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`companies/${companyId}/contacts`, {
        params: {
          include: 'phones, contactType',
          sort: 'name_sort',
          limit: 100,
        },
      })
    );

    if (response?.data) {
      dispatch({
        type: SET_CONTACTS,
        payload: response,
      });
    } else {
      // we'll disable the spinner if something goes wrong with the API
      setFetchingContacts(false);
    }
  };

/*
 * NON API THUNKS
 * */

export const setContactCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: CONTACT_CREATED,
    payload: value,
  });
};

export const setContactEdited = (value: boolean) => (dispatch) => {
  dispatch({
    type: CONTACT_EDITED,
    payload: value,
  });
};

export const setPhoneRecord = (value: any) => (dispatch) => {
  dispatch({
    type: PHONE_RECORD,
    payload: value,
  });
};

export const setPhoneRecordEdited = (value: boolean) => (dispatch) => {
  dispatch({
    type: PHONE_RECORD_EDITED,
    payload: value,
  });
};

export const setContactTypeIcon = (value: string) => (dispatch) => {
  dispatch({
    type: SET_CONTACT_TYPE_ICON,
    payload: value,
  });
};

export const setFetchingContacts = (value: boolean) => (dispatch) => {
  dispatch({
    type: FETCHING_COMPANY_CONTACTS,
    payload: value,
  });
};

export const setRecentlyAdded = (value: string) => (dispatch) => {
  dispatch({
    type: RECENTLY_ADDED,
    payload: value,
  });
};

export const setSelectedContact = (value: any) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_CONTACT,
    payload: value,
  });
};

export const setContactFormMode = (value: string) => (dispatch) => {
  dispatch({
    type: SET_CONTACT_FORM_MODE,
    payload: value,
  });
};

export const setDeleteContactModal = (value: boolean) => (dispatch) => {
  dispatch({
    type: SET_DELETE_CONTACT_MODAL,
    payload: value,
  });
};

export const setContactDeleted = (value: boolean) => (dispatch) => {
  dispatch({
    type: CONTACT_DELETED,
    payload: value,
  });
};

export const setFormEmailErrors = () => (dispatch) => {
  dispatch({
    type: FORM_ERRORS,
    payload: { email: ['Phone number field or email field is required.'] },
  });
};
