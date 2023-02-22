import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { useUser } from 'Context/User';
import { UserPhonesModel } from 'Containers/User/Models/UserPhonesModel';
import { countries } from 'Utils/data';

import { UserModel } from 'Containers/User/Models/UserModel';
import { convertPhoneNumber, formatPhoneInternationalWithCountryCode } from 'Utils/helpers';
import {
  userUpdatedSelector,
  emailErrorSelector,
  extensionErrorSelector,
  firstNameErrorSelector,
  lastNameErrorSelector,
  phoneErrorSelector,
} from 'Containers/User/selector';
import { updateUser, userDetails, setUserUpdated, userPhones } from 'Containers/User/actions';
import { editPhoneRecord, setPhoneRecordEdited } from 'Containers/People/PeopleTabs/ContactsTab/actions';
import { phoneRecordEditedSelector } from 'Containers/People/PeopleTabs/ContactsTab/selectors';

import { UserProfile } from 'Components/Profiles';

const UserProfileContainer = () => {
  const dispatch = useDispatch();

  const user: UserModel = useUser();
  const phones: UserPhonesModel = useSelector(({ user: { userPhones = {} } }: any) => userPhones, areEqual);

  const userUpdated = useSelector(userUpdatedSelector, areEqual);
  const phoneUpdated = useSelector(phoneRecordEditedSelector, areEqual);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  const [userIsEditable, setUserIsEditable] = useState(false);
  const [phoneId, setPhoneId] = useState(undefined);
  const [extension, setExtension] = useState('');
  const [countryId, setCountryId] = useState(1);
  const [countryCode, setCountryCode] = useState('');
  const [countryCodeNumber, setCountryCodeNumber] = useState(1);
  const [countryFlag, setCountryFlag] = useState('usa');

  const errors = {
    firstName: useSelector(firstNameErrorSelector, areEqual),
    lastName: useSelector(lastNameErrorSelector, areEqual),
    phone: useSelector(phoneErrorSelector, areEqual),
    email: useSelector(emailErrorSelector, areEqual),
    extension: useSelector(extensionErrorSelector, areEqual),
  };

  useEffect(() => {
    if (user?.id && !phones?.data?.length) {
      dispatch(userPhones(`users/${user.id}/phones`, 'get'));
    }
  }, [user]);

  useEffect(() => {
    if (phones?.data?.length > 0) {
      const { data } = phones;
      const { value, id, extension, country_code: countryCode, country_alpha_2: countryAlpha } = data[0];

      setCountryCode(countryCode);
      setPhone(formatPhoneInternationalWithCountryCode(countryCode, value));
      setPhoneId(id);
      setExtension(extension);

      const country = countries.find((country) => country.alpha_2 === countryAlpha);
      const { id: idCountry, flag, code } = country;

      setCountryId(idCountry);
      setCountryFlag(flag);
      setCountryCodeNumber(code);
    }
    if (user?.id) {
      const { avatar_url: userAvatar, first_name: userFirstName, last_name: userLastName, email: userEmail } = user;

      setFirstName(userFirstName);
      setLastName(userLastName);
      setEmail(userEmail);
      setUserAvatar(userAvatar);
    }
  }, [user, phones]);

  useEffect(() => {
    if (userUpdated && phoneUpdated) {
      dispatch(userDetails());
      setUserIsEditable(false);
    }
    return () => {
      if (userUpdated) {
        dispatch(setUserUpdated(false));
      }
      if (phoneUpdated) {
        dispatch(setPhoneRecordEdited(false));
      }
    };
  }, [userUpdated, phoneUpdated]);

  const onEditUserClick = useCallback(
    (e: any) => {
      e.preventDefault();
      setUserIsEditable(true);
    },
    [userIsEditable]
  );

  const onCancelClick = useCallback(
    (e: any) => {
      e.preventDefault();
      setUserIsEditable(false);
    },
    [userIsEditable]
  );

  const onChangeFirstName = useCallback(({ target: { value } }) => {
    setFirstName(value);
  }, []);

  const onChangeLastName = useCallback((e: any) => {
    const { value } = e.target;
    setLastName(value);
  }, []);

  // Email and Phone update not used yet

  const onChangePhone = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  const onChangeEmail = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      dispatch(
        updateUser(`users/${user.id}`, 'put', {
          first_name: firstName,
          last_name: lastName,
          email,
        })
      );

      if (phoneId) {
        dispatch(
          editPhoneRecord(phoneId, {
            value: convertPhoneNumber(countryCode, phone),
            extension,
            is_primary: true,
            type: 'mobile',
          })
        );
      }
    },
    [phoneId, phone, extension, email, firstName, lastName]
  );

  return (
    <UserProfile
      userAvatar={userAvatar}
      firstName={firstName}
      lastName={lastName}
      phone={phone}
      email={email}
      formErrors={errors}
      onEditUserClick={onEditUserClick}
      onCancelClick={onCancelClick}
      onFormSubmit={onFormSubmit}
      userEditable={userIsEditable}
      onChangeFirstName={onChangeFirstName}
      onChangeLastName={onChangeLastName}
      onChangePhone={onChangePhone}
      onChangeEmail={onChangeEmail}
      countryCode={countryCodeNumber}
      countryId={countryId}
      countryFlag={countryFlag}
    />
  );
};

const UserProfileContainerMemo = memo(UserProfileContainer, areEqual);

export { UserProfileContainerMemo as UserProfileContainer };
