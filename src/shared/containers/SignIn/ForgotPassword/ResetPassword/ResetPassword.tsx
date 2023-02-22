import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { ResetPassword } from 'Components/SignIn';
import { passwordEightCharactersValidator } from 'Utils/regex';
import { setFormErrors } from 'Containers/Core/actions';
import { useDebounce } from 'Hooks/useDebounce';
import { useHistory } from 'react-router-dom';
import { setTitle } from 'Containers/SignIn/SignInEmail';
import { resetPassword } from './actions';
import { emailErrorSelector, tokenErrorSelector, passwordErrorSelector, redirectSelector } from './selectors';

interface Props {
  token: string | string[];
  email: string | string[];
}
const ResetPasswordContainer = ({ token, email }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [passwordChangeMessage] = useState('A good password contains a mix of letters, numbers and symbols');
  // setup State for the two passwords
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const errors = {
    token: useSelector(tokenErrorSelector, areEqual),
    email: useSelector(emailErrorSelector, areEqual),
    password: useSelector(passwordErrorSelector, areEqual),
  };
  const redirect = useSelector(redirectSelector, areEqual);

  // Ensure that the password is 8 chars long
  const isPassword8CharsLong = useCallback(
    (password: string) => passwordEightCharactersValidator.validate(password),
    []
  );

  const onChangePasswordDebounce = useCallback(
    useDebounce((value: string) => {
      if (value.length === 0) {
        setIsPasswordValid(true);
        dispatch(setFormErrors({ password: [] }));
        return;
      }

      const isValid = isPassword8CharsLong(value);

      // @ts-ignore - isValid is a boolean, but could be a string[] according to TypeScript.
      setIsPasswordValid(isValid);

      if (isValid) {
        setPassword(value);
      }
    }, 700),
    []
  );

  const onChangePassword = useCallback((e: any) => {
    const { value } = e.target;
    onChangePasswordDebounce(value);
  }, []);

  const onChangeConfirmPasswordDebounce = useCallback(
    useDebounce((value: string) => {
      if (value.length === 0) {
        setIsConfirmPasswordValid(true);
        dispatch(setFormErrors({ password: [] }));
        return;
      }
      const isValid = isPassword8CharsLong(value);

      // @ts-ignore - isValid is a boolean, but could be a string[] according to TypeScript.
      setIsConfirmPasswordValid(isValid);

      if (isValid) {
        setConfirmPassword(value);
      }
    }, 700),
    []
  );
  const onConfirmPasswordChange = useCallback((e: any) => {
    const { value } = e.target;
    onChangeConfirmPasswordDebounce(value);
  }, []);

  const onResetPasswordClick = useCallback(
    (e: any) => {
      e.preventDefault();
      // @ts-ignore - typscript things email is a string or an array.  In our case it is a string only.
      dispatch(resetPassword(email, password, token, confirmPassword));

      // Invalidate he form
      setIsPasswordValid(false);
      setIsConfirmPasswordValid(false);
    },
    [email, token, password, confirmPassword]
  );

  // toggle password show or hide
  const togglePasswordShow = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  useEffect(() => {
    // This will send the user to the login page if redirect is set to true.
    if (redirect) {
      history.push('/signinemail');
      // Update the SignIn component title
      dispatch(setTitle('Password Updated!'));
    }
  }, [redirect]);

  return (
    <ResetPassword
      isPasswordValid={isPasswordValid}
      isConfirmedPasswordValid={isConfirmPasswordValid}
      showPassword={showPassword}
      formErrors={errors}
      passwordChangeMessage={passwordChangeMessage}
      togglePasswordShow={togglePasswordShow}
      onResetPasswordClick={onResetPasswordClick}
      onChangePassword={onChangePassword}
      onChangeConfirmPassword={onConfirmPasswordChange}
    />
  );
};

const ResetPasswordContainerMemo = memo(ResetPasswordContainer, areEqual);
export { ResetPasswordContainerMemo as ResetPassword };
