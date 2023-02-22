import React, { memo, useCallback, useEffect, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { SignUpEmail } from 'Components/SignIn/SignUpEmail';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'Containers/Auth/actions';
import { inviteCompanyInfoSelector } from 'Containers/SignIn/SignInHow/selector';
// TODO::keep the error returns as array, we need to build the invalidFeedback component to handle multiple error messages

const emailSelector = ({ core }: any) => {
  const error = core?.formErrors?.email;
  // This deals with the email array when it's undefined
  return error && Array.isArray(error) ? error : [];
};

const passwordSelector = ({ core }: any) => {
  const error = core?.formErrors?.password;
  // This deals with the password array when it's undefined
  return error && Array.isArray(error) ? error : [];
};

const confirmPasswordSelector = ({ core }: any) => {
  const error = core?.formErrors?.confirm_password;
  // This deals with the confirm_password array when it's undefined
  return error && Array.isArray(error) ? error : [];
};

const emailValueSelector = ({ signinhow: { email } }: any) => email;
const fetchingSelector = ({ core: { fetching } }: any) => fetching;

const SignUpEmailContainer = () => {
  const dispatch = useDispatch();

  // set local error messages without undefined issue
  const errors = {
    email: useSelector(emailSelector, areEqual),
    password: useSelector(passwordSelector, areEqual),
    confirmPassword: useSelector(confirmPasswordSelector, areEqual),
  };

  // to disable the submit on api request
  const fetching = useSelector(fetchingSelector, areEqual);

  // local variables
  const email = useSelector(emailValueSelector, areEqual);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // helpers
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatches, setPasswordMatches] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  // selector for invite banner data
  const { name: companyName, logoUrl } = useSelector(inviteCompanyInfoSelector, areEqual);

  // set local variables
  const onChangePassword = useCallback((e: any) => {
    const { value } = e.target;

    setIsButtonEnabled(value.length === 0);
    setPassword(value);
  }, []);

  const onChangeConfirmPassword = useCallback((e: any) => {
    const { value } = e.target;

    setIsButtonEnabled(value.length === 0);
    setConfirmPassword(value);
  }, []);

  // toggle password show or hide
  const togglePasswordShow = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  // we'll show password the error if the passwords don't match
  useEffect(() => {
    if (password || confirmPassword) {
      setPasswordMatches(password === confirmPassword ? 'match' : 'not-match');
    } else {
      setPasswordMatches('');
    }
  }, [password, confirmPassword]);

  // we'll disable the submit button if passwords don't match
  useEffect(() => {
    setIsButtonEnabled(passwordMatches !== 'match');
  }, [passwordMatches]);

  // submit the form
  const onFormButtonClick = (e: any) => {
    e.preventDefault();

    setIsButtonEnabled(errors.email?.length === 0 || errors.password?.length === 0);

    dispatch(
      register('auth/register', 'post', {
        email,
        password,
        password_confirmation: confirmPassword,
      })
    );
  };

  return (
    <SignUpEmail
      email={email}
      password={password}
      companyName={companyName}
      companyLogo={logoUrl}
      onChangePassword={onChangePassword}
      confirmPassword={confirmPassword}
      onChangeConfirmPassword={onChangeConfirmPassword}
      showPassword={showPassword}
      passwordMatches={passwordMatches}
      togglePasswordShow={togglePasswordShow}
      onFormButtonClick={onFormButtonClick}
      formErrors={errors}
      fetching={fetching}
      isButtonEnabled={isButtonEnabled}
    />
  );
};

// This allows for default props if they exist
const SignUpEmailContainerMemo = memo(SignUpEmailContainer, areEqual);

export { SignUpEmailContainerMemo as SignUpEmailContainer };
