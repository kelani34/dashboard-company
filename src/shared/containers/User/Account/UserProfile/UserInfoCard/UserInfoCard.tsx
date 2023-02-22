import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { useUser } from 'Context/User';
import { UserPhonesModel } from 'Containers/User/Models/UserPhonesModel';

import { UserModel } from 'Containers/User/Models/UserModel';
import { UserInfoCard } from 'Components/Profiles/Account/UserProfile/UserInfoCard';
import { logout } from 'Containers/Auth/actions';
import { removeAppRedirectPathLocal } from 'Containers/Core/actions';
import { userPhones } from 'Containers/User/actions';
import { formatPhoneInternationalWithCountryCode } from 'Utils/helpers';

const UserInfoCardContainer = () => {
  const dispatch = useDispatch();

  const user: UserModel = useUser();
  const phones: UserPhonesModel = useSelector(({ user: { userPhones = {} } }: any) => userPhones, areEqual);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (user?.id) {
      dispatch(userPhones(`users/${user.id}/phones`, 'get'));
    }
  }, [user]);

  useEffect(() => {
    if (phones?.data?.length > 0) {
      const { data } = phones;
      const [phone] = data;
      const { value, country_code: code } = phone;
      setPhone(formatPhoneInternationalWithCountryCode(code, value));
    }
    if (user?.id) {
      const { full_name: userFullName, email: userEmail } = user;

      setFullName(userFullName);
      setEmail(userEmail);
    }
  }, [user, fullName, email, phones]);

  const handleLogOutClick = useCallback((e: any) => {
    e.preventDefault();
    removeAppRedirectPathLocal();
    dispatch(logout('auth/logout'));
  }, []);

  return <UserInfoCard fullName={fullName} phone={phone} email={email} onLogOutClick={handleLogOutClick} />;
};
const UserInfoCardContainerMemo = memo(UserInfoCardContainer, areEqual);

export { UserInfoCardContainerMemo as UserInfoCardContainer };
