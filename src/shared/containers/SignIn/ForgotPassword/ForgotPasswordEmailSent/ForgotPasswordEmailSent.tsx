import React, { memo, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ForgotPasswordEmailSent } from 'Components/SignIn';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';
import { setToaster } from 'Containers/Core';
import { Toast } from 'Components/Toast';
import { sendResetLinkRequest } from '../ForgotPassword/actions';

const messageSelector = ({ forgotPassword: { message }, signinhow: { email }, core: { formErrors } }) => ({
  message,
  email,
  formErrors,
});
const ForgotPasswordEmailSentContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { message, email, formErrors } = useSelector(messageSelector, areEqual);

  useEffect(() => {
    // Redirect when the request is complete.  Add an action for this.
    if (message?.length > 0) {
      dispatch(setToaster(message));
      history.push('/forgotpassword/emailsent');
    }
  }, [message]);

  useEffect(() => {
    if (formErrors?.email) {
      dispatch(setToaster(formErrors.email, true));
    }
  }, [formErrors]);

  const resendEmail = useCallback((e: any) => {
    e.preventDefault();
    // send reset link
    dispatch(sendResetLinkRequest(email));
  }, []);

  const returnToMainScreen = useCallback(() => {
    history.push('/forgotpassword');
  }, []);

  return (
    <>
      <Toast />
      <ForgotPasswordEmailSent message={message} resendEmail={resendEmail} returnToMainScreen={returnToMainScreen} />
    </>
  );
};

// This allows for default props if they exist
const ForgotPasswordEmailSentContainerMemo = memo(ForgotPasswordEmailSentContainer, areEqual);
export { ForgotPasswordEmailSentContainerMemo as ForgotPasswordEmailSent };
// /forgotpassword
