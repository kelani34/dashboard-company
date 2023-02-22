import React, { memo, useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { ForgotPassword } from 'Components/SignIn';
import { setToaster } from 'Containers/Core';
import { emailValidator } from 'Utils/regex';
import { clearResetLinkResponseMessage, sendResetLinkRequest } from './actions';

const messageSelector = ({ forgotPassword: { message }, signinemail: { email }, core: { formErrors } }) => ({
  message,
  email,
  formErrors,
});
const fetchingSelector = ({ core: { fetching } }: any) => fetching;

const ForgotPasswordContainer = () => {
  // to disable the submit on api request
  const fetching = useSelector(fetchingSelector, areEqual);
  const { message, formErrors } = useSelector(messageSelector, areEqual);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isFormValid, setIsFormValid] = useState(true);
  const [email, setEmail] = useState('');
  const onFormSubmit = useCallback(
    (formData: any) => {
      const { email, isValid, isFinishedValidation } = formData;
      // Sometimes the form check for validation fails.  Let's ensure that the incoming email is valid
      const validity = isValid && isFinishedValidation && emailValidator(email);

      // based on Validity.  We want the inverse.  We need true to disable the button, false to enable it
      setIsButtonDisabled(!validity);

      // If isValid is false, just set setIsFormValid and return
      if (!isValid || !email) {
        setIsFormValid(isValid);
        return;
      }
      if (email.length === 0) {
        // If the user has hit the backspace or cut the email out, reset the form
        setIsFormValid(true);
        return;
      }

      setIsFormValid(validity);
      if (validity) {
        setEmail(email);
      }
    },
    [isFormValid]
  );

  useEffect(() => {
    // Redirect when the request is complete.  Add an action for this.
    if (message?.length > 0) {
      setToaster(message);
      history.push('/forgotpassword/emailsent');
    }
    return () => {
      dispatch(clearResetLinkResponseMessage());
    };
  }, [message]);

  useEffect(() => {
    if (formErrors?.email) {
      dispatch(setToaster(formErrors.email, true));
    }
  }, [formErrors]);

  const onSignInSignUpClick = useCallback((e: any) => {
    e.preventDefault();
    // Trigger a route change
    history.push('/signinemail');
  }, []);

  const onSendResetLinkClick = useCallback(
    (e: any) => {
      e.preventDefault();
      // send reset link
      dispatch(sendResetLinkRequest(email));
      setIsButtonDisabled(!fetching);
    },
    [email, isFormValid]
  );

  return (
    <ForgotPassword
      isFormValid={isFormValid}
      isButtonDisabled={isButtonDisabled}
      onFormSubmit={onFormSubmit}
      onSendResetLinkClick={onSendResetLinkClick}
      onSignInSignUpClick={onSignInSignUpClick}
    />
  );
};

const ForgotPasswordContainerMemo = memo(ForgotPasswordContainer, areEqual);
export { ForgotPasswordContainerMemo as ForgotPassword };
