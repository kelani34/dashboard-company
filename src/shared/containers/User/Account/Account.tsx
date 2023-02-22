import React, { memo, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { UserProfileWrapper, ProfileUpdatedToast } from 'Components/Profiles';
import { userUpdatedSelector } from 'Containers/User/selector';
import { phoneRecordEditedSelector } from 'Containers/People/PeopleTabs/ContactsTab/selectors';
import {
  companyUpdatedSelector,
  companyPhoneUpdatedSelector,
  companyPhoneCreatedSelector,
  companyAddressUpdatedSelector,
  companyAddressCreatedSelector,
} from 'Containers/Company/selectors';
import { CompanyProfile, PhotoCategories, UserProfile } from '.';

const AccountContainer = () => {
  const userUpdated = useSelector(userUpdatedSelector, areEqual);
  const phoneUpdated = useSelector(phoneRecordEditedSelector, areEqual);

  const companyUpdated = useSelector(companyUpdatedSelector, areEqual);
  const companyPhoneUpdated = useSelector(companyPhoneUpdatedSelector, areEqual);
  const companyPhoneCreated = useSelector(companyPhoneCreatedSelector, areEqual);
  const companyAddressUpdated = useSelector(companyAddressUpdatedSelector, areEqual);
  const companyAddressCreated = useSelector(companyAddressCreatedSelector, areEqual);

  const [toastIsDisplayed, setToastIsDisplayed] = useState(false);

  useEffect(() => {
    if (userUpdated && phoneUpdated) {
      setToastIsDisplayed(true);
    }
    if (
      companyUpdated &&
      (companyPhoneUpdated || companyPhoneCreated) &&
      (companyAddressUpdated || companyAddressCreated)
    ) {
      setToastIsDisplayed(true);
    }
  }, [
    userUpdated,
    phoneUpdated,
    companyUpdated,
    companyPhoneCreated,
    companyPhoneUpdated,
    companyAddressCreated,
    companyAddressUpdated,
  ]);

  useEffect(() => {
    if (toastIsDisplayed) {
      setTimeout(() => {
        setToastIsDisplayed(false);
      }, 3000);
    }
  }, [toastIsDisplayed]);

  const closeToast = useCallback(() => {
    if (toastIsDisplayed) {
      setToastIsDisplayed(false);
    }
  }, [toastIsDisplayed]);

  return (
    <UserProfileWrapper tab="account">
      <UserProfile />
      <CompanyProfile />
      <PhotoCategories />
      <ProfileUpdatedToast isDisplayed={toastIsDisplayed} message="Changes Saved" closeToast={closeToast} />
    </UserProfileWrapper>
  );
};
const AccountContainerMemo = memo(AccountContainer, areEqual);

export { AccountContainerMemo as AccountContainer };
