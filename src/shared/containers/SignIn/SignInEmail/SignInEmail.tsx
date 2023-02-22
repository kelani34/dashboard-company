import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { areEqual } from "Utils/equalityChecks";
import { SignInEmail } from "Components/SignIn/";
import { login } from "Containers/Auth";
import { useHistory } from "react-router-dom";
import { passwordEightCharactersValidator, emailValidator } from "Utils/regex";
import { clear } from "./actions";

import { setEmail } from "../SignInHow/actions";

const fetchingSelector = ({ core: { fetching } }: any) => fetching;

const formErrorsSelector = ({ core }: any) => {
  // const passwordError = core?.formErrors?.password;
  const passwordError = core?.formErrors?.auth;
  // This deals with the password array when it's undefined
  return passwordError && Array.isArray(passwordError) ? passwordError[0] : "";
};

const emailSelector = ({ signinemail, signinhow }: any) => ({ email: signinhow.email, title: signinemail.title });

const SignInEmailContainer = () => {
  // to disable the submit on api request
  const fetching = useSelector(fetchingSelector, areEqual);
  const formErrorMessage = useSelector(formErrorsSelector, areEqual);
  const { email, title } = useSelector(emailSelector, areEqual);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState(email);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const onPasswordChange = useCallback((e: any) => {
    const { value } = e.target;
    // validate the password
    if (!passwordEightCharactersValidator.validate(password))
      setIsFormValid(!passwordEightCharactersValidator.validate(password));
    // If the password is empty, disable the button
    setIsButtonDisabled(value.length === 0);
    setPassword(value);
  }, []);

  useEffect(() => {
    // Here is where I check and determine if there is an error or not.
    // If there is no formMessage, the form is valid    /
    setIsFormValid(formErrorMessage.length === 0);
    // TODO: Do I need this?
    // setSignInEmail(email);
    return () => {
      // This will clear any errors and reset the title for the SignInEmail screen.
      // When a user forgets a password, it changes, when they are redirected to this screen.
      dispatch(clear());
    };
  }, [formErrorMessage, email]);

  // helper
  const [showPassword, setShowPassword] = useState(false);

  // toggle password show or hide
  const togglePasswordShow = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  const onFormButtonClick = (e: any) => {
    e.preventDefault();
    setIsButtonDisabled(!fetching);
    dispatch(login("/auth/login", "post", { email, password }));
  };

  const onForgotPasswordClick = () => {
    history.push("/forgotpassword");
  };

  const onChangeEmail = useCallback((e: any) => {
    const { value } = e.target;
    const trimmedValue = value.trim();

    setSignInEmail(trimmedValue);
    if (value.length === 0) {
      setIsEmailValid(true);
      // dispatch(setFormErrors({ password: [] }));
      return;
    }
    // Validate the email
    const isValidEmail = emailValidator(trimmedValue);
    // @ts-ignore - isValid is a boolean, but could be a string[] according to TypeScript.
    setIsEmailValid(isValidEmail);

    if (isValidEmail) {
      // Do what??
      dispatch(setEmail(trimmedValue));
    }
  }, []);

  return (
    <SignInEmail
      title={title}
      email={signInEmail}
      isEmailValid={isEmailValid}
      password={password}
      formErrorMessage={formErrorMessage}
      isFormValid={isFormValid}
      onFormButtonClick={onFormButtonClick}
      onPasswordChange={onPasswordChange}
      onForgotPasswordClick={onForgotPasswordClick}
      showPassword={showPassword}
      togglePasswordShow={togglePasswordShow}
      isButtonDisabled={isButtonDisabled}
      onChangeEmail={onChangeEmail}
    />
  );
};

// This allows for default props if they exist
const SignInEmailContainerMemo = memo(SignInEmailContainer, areEqual);

export { SignInEmailContainerMemo as SignInEmail };
