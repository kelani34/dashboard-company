/*eslint-disable */
//Getting an error about returning a value from an arrow function, but the error does not exist
import React, { memo, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { areEqual } from 'Utils/equalityChecks';
import { SignInHow } from 'Components/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import { Oauth2 } from 'Utils/oauth2';
import { setEmail, getBasicCompanyInfo, setValidated } from './actions';
import { emailValidator } from 'Utils/regex';
import { inviteCompanyInfoSelector, validatedSelector } from 'Containers/SignIn/SignInHow/selector';

const signInHowSelector = ({ signinhow: { registered } }: any) => registered;

const SignInHowContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isFormValid, setIsFormValid] = useState(true);
  const registered = useSelector(signInHowSelector, areEqual);
  const validated = useSelector(validatedSelector, areEqual);
  const inviteCompanyInfo = useSelector(inviteCompanyInfoSelector, areEqual);

  const { uuid: inviteCompanyUuid } = useParams<{ uuid: string }>();
  const { name: companyName, logoUrl } = useSelector(inviteCompanyInfoSelector, areEqual);

  //Ensure that previous users are logged out
  useEffect(() => {
    //Let's clear out any previous users
    if (registered && validated) history.push('/signinemail');

    if (inviteCompanyUuid) {
      // if signing in using invite, get company info before redirect
      if (!registered && companyName && validated && inviteCompanyInfo?.companyId) history.push('/signupemail');
      if (!registered && !companyName && validated && inviteCompanyInfo?.companyId) history.push('/selectaccounttype');
    } else {
      if (!registered && companyName && validated) history.push('/signupemail');
      if (!registered && !companyName && validated) history.push('/selectaccounttype');
    }

    // Clean up before the component is unmounted
    return () => {
      if (validated) {
        dispatch(setValidated(false));
      }
    };
  }, [registered, validated, companyName, inviteCompanyUuid, inviteCompanyInfo]);

  // get inviter company info
  useEffect(() => {
    if (inviteCompanyUuid) {
      // @ts-ignore - companyUuid can be a string or an array, but here it's used as a string
      dispatch(getBasicCompanyInfo(inviteCompanyUuid));
    }
  }, [inviteCompanyUuid]);

  const continueWithClick = (e: any) => {
    // Trigger route change here, based on which button is being clicked
    // Use currentTarget because the button has elements wrapped inside of it.
    const { id } = e.currentTarget;

    switch (id.toLocaleLowerCase()) {
      case 'btngoogle':
        dispatch(Oauth2('google'));
        break;
      case 'btnfacebook':
        dispatch(Oauth2('facebook'));
        break;
      case 'btnapple':
        dispatch(Oauth2('apple'));
        break;
      default:
        break;
    }
  };

  const onFormSubmit = (formData: any) => {
    const { email, isValid, isFinishedValidation } = formData;

    //If isValid is false, just set setIsFormValid and return
    if (!isValid || !email) {
      setIsFormValid(isValid);
      return;
    } else if (email?.length === 0) {
      //If the user has hit the backspace or cut the email out, reset the form
      setIsFormValid(true);
      return;
    }

    //Sometimes the form check for validation fails.  Let's ensure that the incoming email is valid
    const validity = isValid && isFinishedValidation && emailValidator(email);

    setIsFormValid(validity);
    if (validity) {
      //dispatch the email for api verification
      dispatch(setEmail(formData.email.trim()));
    }
  };

  if (inviteCompanyUuid) {
    return (
      <SignInHow
        isFormValid={isFormValid}
        onFormSubmit={onFormSubmit}
        onClick={continueWithClick}
        companyName={companyName}
        companyLogo={logoUrl}
      />
    );
  } else {
    return <SignInHow isFormValid={isFormValid} onFormSubmit={onFormSubmit} onClick={continueWithClick} />;
  }
};

// This allows for default props if they exist
const SignInHowContainerMemo = memo(SignInHowContainer, areEqual);

export { SignInHowContainerMemo as SignInHow };
