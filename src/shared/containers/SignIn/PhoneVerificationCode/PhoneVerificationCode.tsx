import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { useHistory } from 'react-router-dom';
import { PhoneVerificationCode } from 'Components/SignIn/PhoneVerificationCode';
import { userDetails, userPhones } from 'Containers/User/actions';
import { UserModel } from 'Containers/User/Models/UserModel';
import { CODE_VERIFIED } from 'Containers/SignIn/PhoneVerificationCode/actions';
import { UserPhonesModel } from 'Containers/User/Models/UserPhonesModel';
import { inviteCompanyInfoSelector } from 'Containers/SignIn/SignInHow/selector';
import { smsSendVerification, smsVerifyCode } from 'Containers/Auth/actions';
import { useUser } from 'Context/User';
import { userPhoneDetailsSelector } from 'Containers/User/selector';

const codeSelector = ({ core }: any) => {
  const error = core?.formErrors?.code;
  return error && Array.isArray(error) ? error : [];
};

const messageSelector = ({ core }: any) => {
  const error = core?.formErrors;
  return typeof error === 'object' ? '' : error;
};

const PhoneVerificationCodeContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // initial data
  const user: UserModel = useUser();
  const phones: UserPhonesModel = useSelector(({ user: { userPhones = {} } }: any) => userPhones, areEqual);
  const userPhoneDetails = useSelector(userPhoneDetailsSelector, areEqual);

  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');

  // selector for invite banner data
  const { name: companyName, logoUrl } = useSelector(inviteCompanyInfoSelector, areEqual);

  useEffect(() => {
    dispatch(userDetails());
  }, []);

  // call this again in case of, if the user is reload the page
  useEffect(() => {
    if (user?.id && !phones?.data?.length) {
      dispatch(userPhones(`users/${user.id}/phones`, 'get'));
    }
  }, [user]);

  // set the recent entered phone number
  useEffect(() => {
    if (userPhoneDetails?.id) {
      const { value, country_code: code } = userPhoneDetails;
      setPhone(value);
      setCountryCode(code);
    }

    // set phone number if page refreshes
    else if (phones?.data?.length) {
      const { data } = phones;
      const [phone] = data;
      const { value, country_code: code } = phone;
      setPhone(value);
      setCountryCode(code);
    }
  }, [phones, userPhoneDetails]);

  // local variables
  const [codeValue, setCodeValue] = useState('');

  // helpers
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  // set local error messages without undefined issue
  const errors = {
    code: useSelector(codeSelector, areEqual),
    message: useSelector(messageSelector, areEqual),
  };

  // to disable the submit on api request
  const fetching = useSelector(({ core: { fetching } }: any) => fetching, areEqual);

  // determine if the API request is success
  const codeVerified = useSelector(({ phoneVerificationCode: { codeVerified } }: any) => codeVerified, areEqual);

  // go back to previous page
  const goBack = useCallback((e: any) => {
    e.preventDefault();
    history.push('/phoneverification');
  }, []);

  // submit the form
  const onFormButtonClick = (e: any) => {
    e.preventDefault();

    dispatch(
      smsVerifyCode('auth/sms-verify-code', 'post', {
        code: codeValue,
        phone: `${phone}`,
      })
    );
  };

  const resendCode = () => {
    dispatch(
      smsSendVerification(
        'auth/sms-send-verification',
        'post',
        {
          phone: `${phones?.data?.[0]?.value}`,
        },
        user.id
      )
    );
  };

  // trigger an auto form submit if the user fill all the boxes
  useEffect(() => {
    setIsButtonEnabled(codeValue.length === 0);

    if (codeValue.length === 4) {
      dispatch(
        smsVerifyCode('auth/sms-verify-code', 'post', {
          code: codeValue,
          phone: `${phone}`,
        })
      );
    }
  }, [codeValue]);

  // route change
  useEffect(() => {
    if (codeVerified) {
      dispatch(userDetails());
    }

    // clean up
    return () => {
      if (codeVerified) {
        dispatch({
          type: CODE_VERIFIED,
          payload: false,
        });
      }
    };
  }, [codeVerified]);

  return (
    <PhoneVerificationCode
      setCodeValue={setCodeValue}
      phone={phone}
      countryCode={countryCode}
      companyName={companyName}
      companyLogo={logoUrl}
      onFormButtonClick={onFormButtonClick}
      formErrors={errors}
      fetching={fetching}
      goBack={goBack}
      resendCode={resendCode}
      isButtonEnabled={isButtonEnabled}
    />
  );
};

// This allows for default props if they exist
const PhoneVerificationCodeContainerMemo = memo(PhoneVerificationCodeContainer, areEqual);

export { PhoneVerificationCodeContainerMemo as PhoneVerificationCodeContainer };
