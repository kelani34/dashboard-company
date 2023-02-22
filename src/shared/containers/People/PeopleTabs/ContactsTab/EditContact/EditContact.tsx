import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { ContactForm } from 'Components/People/PeopleTabs';
import { useDispatch, useSelector } from 'react-redux';
import { coreFetchingSelector } from 'Containers/Core/selectors';
import {
  createPhoneRecord,
  editContact,
  editPhoneRecord,
  setContactTypeIcon,
  setDeleteContactModal,
  setFormEmailErrors,
  setPhoneRecord,
} from 'Containers/People/PeopleTabs/ContactsTab/actions';
import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import { useUser } from 'Context/User';
import { UserModel } from 'Containers/User/Models/UserModel';
import {
  companyNameErrorSelector,
  contactFormModeSelector,
  contactTypeIdErrorSelector,
  emailErrorSelector,
  extensionErrorSelector,
  firstNameErrorSelector,
  lastNameErrorSelector,
  phoneErrorSelector,
  phoneRecordSelector,
  selectedContactSelector,
} from 'Containers/People/PeopleTabs/ContactsTab/selectors';
import { convertPhoneNumber } from 'Utils/helpers';
import { countries } from 'Utils/data';

const EditContactContainer = () => {
  const dispatch = useDispatch();

  // form variables
  const [contactId, setContactId] = useState(undefined);
  const [phoneId, setPhoneId] = useState(undefined);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isACompany, setIsACompany] = useState(false);
  const [phone, setPhone] = useState('');
  const [extension, setExtension] = useState('');
  const [email, setEmail] = useState('');
  const [contactType, setContactType] = useState(undefined);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState(1);
  const [selectedCountryCode, setSelectedCountryCode] = useState(1);
  const [selectedCountryFlag, setSelectedCountryFlag] = useState('usa');

  const fetching = useSelector(coreFetchingSelector, areEqual);
  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);
  const phoneRecord = useSelector(phoneRecordSelector, areEqual);
  const selectedContact = useSelector(selectedContactSelector, areEqual);
  const contactFormMode = useSelector(contactFormModeSelector, areEqual);
  const user: UserModel = useUser();

  // form errors
  const errors = {
    firstName: useSelector(firstNameErrorSelector, areEqual),
    lastName: useSelector(lastNameErrorSelector, areEqual),
    companyName: useSelector(companyNameErrorSelector, areEqual),
    phone: useSelector(phoneErrorSelector, areEqual),
    email: useSelector(emailErrorSelector, areEqual),
    extension: useSelector(extensionErrorSelector, areEqual),
    contactType: useSelector(contactTypeIdErrorSelector, areEqual),
  };

  useEffect(() => {
    if (selectedContact?.id) {
      const {
        id,
        phoneId: phoneIdLocal,
        firstName,
        lastName,
        companyName,
        phone,
        extension,
        email,
        isCompany,
        contactTypeId,
      } = selectedContact;

      setPhoneId(phoneIdLocal);
      setContactId(id);
      setFirstName(firstName);
      setLastName(lastName || '');
      setCompanyName(companyName || '');
      setIsACompany(isCompany);
      setPhone(phone || '');
      setExtension(extension || '');
      setEmail(email || '');
      setContactType(contactTypeId || undefined);
    }
  }, [selectedContact]);

  const onChangeFirstName = useCallback((e: any) => {
    const { value } = e.target;

    setFirstName(value);
    setIsButtonEnabled(value.length === 0);
  }, []);

  const onChangeLastName = useCallback((e: any) => {
    const { value } = e.target;

    setLastName(value);
    setIsButtonEnabled(value.length === 0);
  }, []);

  const onChangeCompanyName = useCallback((e: any) => {
    const { value } = e.target;

    setCompanyName(value);
    setIsButtonEnabled(value.length === 0);
  }, []);

  const onToggleCompany = useCallback((checked: boolean) => {
    setIsACompany(checked);
    dispatch(setContactTypeIcon(checked ? 'highrisesmall' : 'personpurple'));
  }, []);

  const onChangePhone = useCallback((e: any) => {
    const { value } = e.target;

    setPhone(value);
    setIsButtonEnabled(value.length === 0);
  }, []);

  const onChangeEmail = useCallback((e: any) => {
    const { value } = e.target;

    setEmail(value);
    setIsButtonEnabled(value.length === 0);
  }, []);

  const onChangeExtension = useCallback((e: any) => {
    const { value } = e.target;

    setExtension(value);
    setIsButtonEnabled(value.length === 0);
  }, []);

  const onDeleteButtonClick = useCallback(() => {
    dispatch(setDeleteContactModal(true));
  }, []);

  const onFormButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();

      if (!email && !phone) {
        dispatch(setFormEmailErrors());
      }

      if (phoneId) {
        dispatch(
          editPhoneRecord(phoneId, {
            value: convertPhoneNumber(countryCode, phone),
            extension,
            is_primary: true,
            type: 'mobile',
          })
        );
      } else if (phone) {
        dispatch(
          createPhoneRecord({
            value: convertPhoneNumber(countryCode, phone),
            extension,
            is_primary: true,
            type: 'mobile',
          })
        );
      } else if (email) {
        dispatch(setPhoneRecord(true));
      }
    },
    [phoneId, phone, extension, countryCode]
  );

  // get country code
  useEffect(() => {
    if (user?.id) {
      const { companies } = user;
      if (companies.length > 0) {
        const [company] = companies;
        const { country_code: countryCode, country_alpha_2: countryAlphaTwo } = company;
        setCountryCode(countryCode);

        // get country selector data
        const countryAlpha = countryAlphaTwo;
        const companyCountry = countries.find((country) => country.alpha_2 === countryAlpha);

        if (companyCountry?.id) {
          const { id, code, flag } = companyCountry;

          setSelectedCountryId(id);
          setSelectedCountryCode(code);
          setSelectedCountryFlag(flag);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (phoneRecord && contactFormMode === 'edit') {
      dispatch(
        editContact(contactId, {
          user_id: user.id,
          company_id: firstCompanyId,
          first_name: firstName,
          last_name: lastName,
          company_name: companyName,
          phoneId: phoneRecord.id,
          email,
          extension,
          is_company: isACompany,
          contact_type_id: contactType,
        })
      );
    }

    return () => {
      dispatch(setPhoneRecord(undefined));
    };
  }, [phoneRecord, contactFormMode]);

  return (
    <ContactForm
      firstName={firstName}
      lastName={lastName}
      companyName={companyName}
      phone={phone}
      extension={extension}
      email={email}
      contactType={contactType}
      isACompany={isACompany}
      fetching={fetching}
      submitButtonText="Save Changes"
      isButtonEnabled={isButtonEnabled}
      formErrors={errors}
      countries={countries}
      onChangeFirstName={onChangeFirstName}
      onChangeLastName={onChangeLastName}
      onChangeCompanyName={onChangeCompanyName}
      onToggleCompany={onToggleCompany}
      onChangePhone={onChangePhone}
      onChangeExtension={onChangeExtension}
      onChangeEmail={onChangeEmail}
      setContactType={setContactType}
      onDeleteButtonClick={onDeleteButtonClick}
      onFormButtonClick={onFormButtonClick}
      selectedCountryId={selectedCountryId}
      selectedCountryCode={selectedCountryCode}
      selectedCountryFlag={selectedCountryFlag}
    />
  );
};

const EditContactContainerMemo = memo(EditContactContainer, areEqual);

export { EditContactContainerMemo as EditContact };
