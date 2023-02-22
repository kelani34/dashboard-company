import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { UserModel } from 'Containers/User/Models/UserModel';
import { userDetails } from 'Containers/User';
import { SignUpUserInformation } from 'Components/SignIn/SignUpUserInformation';
import { createCompanyRecord, updateUser, updateUserAndAttachToCompany } from 'Containers/User/actions';
import { inviteCompanyInfoSelector } from 'Containers/SignIn/SignInHow/selector';

// error selectors
const firstNameSelector = ({ core }: any) => {
  const error = core?.formErrors?.first_name;
  // This deals with the phone array when it's undefined
  return error && Array.isArray(error) ? error : [];
};

const lastNameSelector = ({ core }: any) => {
  const error = core?.formErrors?.last_name;
  // This deals with the phone array when it's undefined
  return error && Array.isArray(error) ? error : [];
};

const companyNameSelector = ({ userInformation }: any) => {
  const error = userInformation?.companyNameErrors?.name;
  // This deals with the phone array when it's undefined
  return error && Array.isArray(error) ? error : [];
};

// form submit success selectors
const useUpdatedSelector = ({ userInformation }: any) => {
  const variable = userInformation?.userUpdated;
  // This deals with the phone array when it's undefined
  return typeof variable === 'boolean' ? variable : false;
};

const companyAttachedSelector = ({ userInformation }: any) => {
  const variable = userInformation?.companyAttached;
  // This deals with the phone array when it's undefined
  return typeof variable === 'boolean' ? variable : false;
};

const SignUpUserInformationContainer = () => {
  const dispatch = useDispatch();

  // need user ID to create a phone record for the user
  const user: UserModel = useSelector(({ user: { user } }: any) => user, areEqual);
  useEffect(() => {
    // get user details on a page refresh (we can remove this later)
    // dispatch(userDetails());
  }, []);

  // when user has been invited
  const { companyId, name: companyInviteName, logoUrl } = useSelector(inviteCompanyInfoSelector, areEqual);

  // local variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isUserInvited, setIsUserInvited] = useState(false);

  // helpers
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  // set local error messages without undefined issue
  const errors = {
    firstName: useSelector(firstNameSelector, areEqual),
    lastName: useSelector(lastNameSelector, areEqual),
    companyName: useSelector(companyNameSelector, areEqual),
  };

  // form success variables
  const userUpdated = useSelector(useUpdatedSelector, areEqual);
  const companyAttached = useSelector(companyAttachedSelector, areEqual);

  // to disable the submit on api request
  const fetching = useSelector(({ core: { fetching } }: any) => fetching, areEqual);

  // set local variables
  const onChangeFirstName = useCallback((e: any) => {
    const { value } = e.target;

    setIsButtonEnabled(value.length === 0);
    setFirstName(value);
  }, []);

  const onChangeLastName = useCallback((e: any) => {
    const { value } = e.target;

    setIsButtonEnabled(value.length === 0);
    setLastName(value);
  }, []);

  const onChangeCompanyName = useCallback((e: any) => {
    const { value } = e.target;

    setIsButtonEnabled(value.length === 0);
    setCompanyName(value);
  }, []);

  // submit the form
  const onFormButtonClick = async (e: any) => {
    e.preventDefault();
    // to update the user
    if (companyId) {
      // if user was invited, need to attach user to company
      dispatch(
        updateUserAndAttachToCompany(user.id, companyId, {
          email: user.email,
          first_name: firstName,
          last_name: lastName,
        })
      );
    } else {
      // create user and company
      dispatch(
        updateUser(`users/${user.id}`, 'put', {
          email: user.email,
          first_name: firstName,
          last_name: lastName,
        })
      );
    }
  };

  useEffect(() => {
    if (companyId) {
      setIsUserInvited(true);
    }
  }, []);

  // once user details updated we'll create and attach a company to the user
  useEffect(() => {
    if (userUpdated) {
      // to create a company record and attach it to the user
      dispatch(
        createCompanyRecord(
          'companies',
          'post',
          {
            name: companyName,
          },
          user.id
        )
      );
    }
  }, [userUpdated]);

  // refresh the user details on successful final API call. This will trigger the route change
  useEffect(() => {
    if (companyAttached) {
      dispatch(userDetails(false, true));
    }
  }, [companyAttached]);

  return (
    <SignUpUserInformation
      firstName={firstName}
      lastName={lastName}
      companyName={companyName}
      companyInviteName={companyInviteName}
      companyLogo={logoUrl}
      isUserInvited={isUserInvited}
      onChangeFirstName={onChangeFirstName}
      onChangeLastName={onChangeLastName}
      onChangeCompanyName={onChangeCompanyName}
      onFormButtonClick={onFormButtonClick}
      formErrors={errors}
      fetching={fetching}
      isButtonEnabled={isButtonEnabled}
    />
  );
};

// This allows for default props if they exist
const SignUpUserInformationContainerMemo = memo(SignUpUserInformationContainer, areEqual);

export { SignUpUserInformationContainerMemo as SignUpUserInformationContainer };
