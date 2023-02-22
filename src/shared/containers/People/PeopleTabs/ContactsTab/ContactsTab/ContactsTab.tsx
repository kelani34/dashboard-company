import React, { memo, useCallback, useEffect, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { useUser } from 'Context/User';
import { UserModel } from 'Containers/User/Models/UserModel';
import { countries } from 'Utils/data';

import { TabContent } from 'Components/Tabs';
import { ContactsTab } from 'Components/People';
import { DeleteToast, InfoCardModal } from 'Components/People/PeopleTabs';
import { useDispatch, useSelector } from 'react-redux';
import { CreateContactModal, EditContactModal } from 'Components/People/PeopleTabs/ContactsTab';
import {
  deleteContact,
  listCompanyContacts,
  setContactCreated,
  setContactDeleted,
  setContactEdited,
  setContactFormMode,
  setDeleteContactModal,
  setSelectedContact,
} from 'Containers/People/PeopleTabs/ContactsTab/actions';
import {
  contactCreatedSelector,
  contactDeletedSelector,
  contactEditedSelector,
  contactsInitialsSelector,
  contactTypeIconSelector,
  fetchingCompanyContactsSelector,
  selectedContactSelector,
  showDeleteContactModalSelector,
  totalContactsSelector,
} from 'Containers/People/PeopleTabs/ContactsTab/selectors';
import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import { DeleteCardModal } from 'Components/People/PeopleTabs/PeopleList/DeleteCardModal';
import { coreFetchingSelector } from 'Containers/Core/selectors';
import ClickOutsideListener from 'HOC/ClickOutsideListener';
import { formatPhoneNumberInternational, convertPhoneNumber } from 'Utils/helpers';

const ContactsTabContainer = () => {
  const dispatch = useDispatch();

  const user: UserModel = useUser();

  const coreFetching = useSelector(coreFetchingSelector, areEqual);
  const fetching = useSelector(fetchingCompanyContactsSelector, areEqual);
  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);
  const contactCreated = useSelector(contactCreatedSelector, areEqual);
  const contactTypeIcon = useSelector(contactTypeIconSelector, areEqual);
  const contactsInitials = useSelector(contactsInitialsSelector, areEqual);
  const totalContacts = useSelector(totalContactsSelector, areEqual);
  const selectedContact = useSelector(selectedContactSelector, areEqual);
  const showDeleteContactModal = useSelector(showDeleteContactModalSelector, areEqual);
  const contactEdited = useSelector(contactEditedSelector, areEqual);
  const contactDeleted = useSelector(contactDeletedSelector, areEqual);

  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [isOpenCreateContact, setIsOpenCreateContact] = useState(false);
  const [isOpenEditContact, setIsOpenEditContact] = useState(false);
  const [isOpenDeleteContact, setIsOpenDeleteContact] = useState(false);
  const [showContactTypeToast, setShowContactTypeToast] = useState(false);
  const [showDeletedToast, setShowDeletedToast] = useState(false);
  const [countryFlag, setCountryFlag] = useState('usa');
  const [phoneNumber, setPhoneNumber] = useState('');

  const getContactsDispatch = useCallback(() => dispatch(listCompanyContacts(firstCompanyId)), [firstCompanyId]);

  // to close the create contact modal
  const onClickCloseCreatContact = useCallback((e: any) => {
    e.preventDefault();
    setIsOpenCreateContact(false);
  }, []);

  // to close the edit contact modal and open the info modal
  const onClickCloseEditContact = useCallback((e: any) => {
    e.preventDefault();
    setIsOpenEditContact(false);
    setIsOpenInfoModal(true);
  }, []);

  // to open the create contact modal
  // we also set the contact form type to edit
  const onClickPlaceholderButton = useCallback(() => {
    setIsOpenCreateContact(true);
    dispatch(setContactFormMode('create'));
  }, []);

  // to close the company type Toast
  const onClickCloseCompanyTypeToast = useCallback(() => setShowContactTypeToast(false), []);

  // to set contact object and show the info modal
  const onClickContactCard = useCallback((contact: any) => {
    dispatch(setSelectedContact(contact));
    setIsOpenInfoModal(true);
  }, []);

  // to close the info modal and clear the contact object
  const onClickInfoModalClose = useCallback((e: any) => {
    e.preventDefault();
    setIsOpenInfoModal(false);
    dispatch(setSelectedContact(undefined));
  }, []);

  // to close the edit contact modal and close the info modal
  // we also set the contact form type to edit
  const onEditButtonClick = useCallback(() => {
    setIsOpenInfoModal(false);
    setIsOpenEditContact(true);
    dispatch(setContactFormMode('edit'));
  }, []);

  // to close the delete modal and open the edit modal
  const onClickDeleteModalClose = useCallback(() => {
    dispatch(setDeleteContactModal(false));
    setIsOpenDeleteContact(false);
    setIsOpenEditContact(true);
  }, []);

  // to delete the contact
  const onClickDeleteContact = useCallback(() => {
    if (selectedContact) {
      dispatch(deleteContact(selectedContact.id));
    }
  }, [selectedContact]);

  const onClickCloseDeleteToast = useCallback(() => {
    setShowDeletedToast(false);
  }, []);

  // on change contact type, we'll update the modal icon
  useEffect(() => {
    if (contactTypeIcon === 'highrisesmall') {
      setShowContactTypeToast(true);
    }
  }, [contactTypeIcon]);

  useEffect(() => {
    if (showContactTypeToast) {
      setTimeout(() => setShowContactTypeToast(false), 1500);
    }
  }, [showContactTypeToast]);

  // to show the delete modal and close the edit modal on redux variable
  useEffect(() => {
    if (showDeleteContactModal) {
      setIsOpenEditContact(false);
      setIsOpenDeleteContact(true);
    }
  }, [showDeleteContactModal]);

  // to list down the contacts
  useEffect(() => {
    if (totalContacts === 0 && firstCompanyId) {
      getContactsDispatch();
    }
  }, [totalContacts, firstCompanyId]);

  // redux clean up and close modals based on different use cases
  useEffect(() => {
    if (contactCreated && isOpenCreateContact) {
      setIsOpenCreateContact(false);
      getContactsDispatch();
    }

    if (contactEdited && isOpenEditContact) {
      setIsOpenEditContact(false);
      getContactsDispatch();
    }

    if (contactDeleted && isOpenDeleteContact) {
      setShowDeletedToast(true);
      setIsOpenDeleteContact(false);
      dispatch(setDeleteContactModal(false));
      getContactsDispatch();

      setTimeout(() => setShowDeletedToast(false), 1500);
    }

    return () => {
      if (contactCreated) {
        setTimeout(() => {
          dispatch(setContactCreated(false));
        }, 1000);
      }
      if (contactEdited) {
        setTimeout(() => {
          dispatch(setContactEdited(false));
        }, 1000);
      }
      if (contactDeleted) {
        setTimeout(() => {
          dispatch(setContactDeleted(false));
        }, 1000);
      }
    };
  }, [contactCreated, contactEdited, isOpenCreateContact, contactDeleted, isOpenDeleteContact]);

  // get country code and flag
  useEffect(() => {
    if (selectedContact) {
      if (user?.id) {
        const { companies } = user;
        if (companies.length > 0) {
          const [company] = companies;
          const { country_alpha_2: countryAlphaTwo, country_code: code } = company;
          const formattedPhoneNumber = convertPhoneNumber(code, selectedContact.phone);

          setPhoneNumber(formatPhoneNumberInternational(formattedPhoneNumber.toString()));

          const countryAlpha = countryAlphaTwo;
          const companyCountry = countries.find((country) => country.alpha_2 === countryAlpha);

          if (companyCountry?.id) {
            const { flag } = companyCountry;
            setCountryFlag(flag);
          }
        }
      }
    }
  }, [user, selectedContact]);

  return (
    <TabContent key="tab-content-contacts-people" id="contacts" className="position-relative">
      <ContactsTab
        contactsInitials={contactsInitials}
        totalContacts={totalContacts}
        fetching={fetching}
        onClickContactCard={onClickContactCard}
        onClickPlaceholderButton={onClickPlaceholderButton}
      />

      <CreateContactModal
        contactTypeIcon={contactTypeIcon}
        showContactTypeToast={showContactTypeToast}
        isOpenCreateContact={isOpenCreateContact}
        onClickCloseCreatContact={onClickCloseCreatContact}
        onClickCloseToast={onClickCloseCompanyTypeToast}
      />

      <EditContactModal
        contactTypeIcon={contactTypeIcon}
        showContactTypeToast={showContactTypeToast}
        isOpenEditContact={isOpenEditContact}
        onClickCloseEditContact={onClickCloseEditContact}
        onClickCloseToast={onClickCloseCompanyTypeToast}
      />

      {selectedContact && (
        <InfoCardModal
          id={selectedContact.id.toString()}
          key={selectedContact.toString()}
          title="Contact"
          name={selectedContact.fullName}
          isACompany={selectedContact.isCompany}
          companyName={selectedContact.companyName}
          email={selectedContact.email}
          flag={countryFlag}
          phone={phoneNumber}
          extension={selectedContact.extension}
          isOpen={isOpenInfoModal}
          modalCloseClick={onClickInfoModalClose}
          onEditButtonClick={onEditButtonClick}
        />
      )}

      {selectedContact && (
        <DeleteCardModal
          id={selectedContact.id}
          title="contact"
          name={selectedContact.fullName}
          isOpen={isOpenDeleteContact}
          coreFetching={coreFetching}
          modalCloseClick={onClickDeleteModalClose}
          onDeleteButtonClick={onClickDeleteContact}
        />
      )}

      {selectedContact && (
        <ClickOutsideListener clickOutside={onClickCloseDeleteToast}>
          <DeleteToast
            isDisplayed={showDeletedToast}
            message={`${selectedContact.firstName} Deleted`}
            closeToast={onClickCloseDeleteToast}
          />
        </ClickOutsideListener>
      )}
    </TabContent>
  );
};

const ContactsTabContainerMemo = memo(ContactsTabContainer, areEqual);

export { ContactsTabContainerMemo as ContactsTab };
