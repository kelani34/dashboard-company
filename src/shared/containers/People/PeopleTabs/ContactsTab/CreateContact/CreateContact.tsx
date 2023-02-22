import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { ContactForm } from 'Components/People/PeopleTabs';
import { useDispatch, useSelector } from 'react-redux';
import { coreFetchingSelector } from 'Containers/Core/selectors';
import {
  createContact,
  createPhoneRecord,
  setContactTypeIcon,
  setFormEmailErrors,
  setPhoneRecord,
} from 'Containers/People/PeopleTabs/ContactsTab/actions';
import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import { useUser } from 'Context/User';
import { UserModel } from 'Containers/User/Models/UserModel';
import {
  companyNameErrorSelector,
  contactCreatedSelector,
  contactFormModeSelector,
  contactTypeIdErrorSelector,
  emailErrorSelector,
  extensionErrorSelector,
  firstNameErrorSelector,
  lastNameErrorSelector,
  phoneErrorSelector,
  phoneRecordSelector,
} from 'Containers/People/PeopleTabs/ContactsTab/selectors';
import { convertPhoneNumber } from 'Utils/helpers';
import { countries } from 'Utils/data';

const CreateContactContainer = () => {
  const dispatch = useDispatch();

  // form variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isACompany, setIsACompany] = useState(false);
  const [phone, setPhone] = useState('');
  const [extension, setExtension] = useState('');
  const [email, setEmail] = useState('');
  const [contactType, setContactType] = useState(undefined);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState(1);
  const [selectedCountryCode, setSelectedCountryCode] = useState(1);
  const [selectedCountryFlag, setSelectedCountryFlag] = useState('usa');

  const fetching = useSelector(coreFetchingSelector, areEqual);
  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);
  const contactCreated = useSelector(contactCreatedSelector, areEqual);
  const phoneRecord = useSelector(phoneRecordSelector, areEqual);
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

  const onFormButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();

      if (!email && !phone) {
        dispatch(setFormEmailErrors());
      }

      if (phone) {
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
    [phone, email, extension]
  );

  useEffect(() => {
    if (phoneRecord && contactFormMode === 'create') {
      dispatch(
        createContact({
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
  }, [phoneRecord, contactFormMode]);

  // get country code
  useEffect(() => {
    if (user?.id) {
      const { companies } = user;
      if (companies.length > 0) {
        const [company] = companies;
        const { country_code: countryCode, country_alpha_2: countryAlphaTwo } = company;
        setCountryCode(countryCode);

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
    if (contactCreated && contactFormMode === 'create') {
      setFirstName('');
      setLastName('');
      setCompanyName('');
      setIsACompany(false);
      setPhone('');
      setExtension('');
      setEmail('');
      setContactType('');
    }
  }, [contactCreated, contactFormMode]);

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
      isButtonEnabled={isButtonEnabled}
      formErrors={errors}
      onChangeFirstName={onChangeFirstName}
      onChangeLastName={onChangeLastName}
      onChangeCompanyName={onChangeCompanyName}
      onToggleCompany={onToggleCompany}
      onChangePhone={onChangePhone}
      onChangeExtension={onChangeExtension}
      onChangeEmail={onChangeEmail}
      setContactType={setContactType}
      countries={countries}
      onFormButtonClick={onFormButtonClick}
      selectedCountryId={selectedCountryId}
      selectedCountryCode={selectedCountryCode}
      selectedCountryFlag={selectedCountryFlag}
    />
  );
};

const CreateContactContainerMemo = memo(CreateContactContainer, areEqual);

export { CreateContactContainerMemo as CreateContact };
