import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { smsSendVerification } from 'Containers/Auth/actions';
import { convertPhoneNumber } from 'Utils/helpers';
import { countries } from 'Utils/data';

import { PhoneVerification } from 'Components/SignIn/PhoneVerification';
import { useHistory } from 'react-router-dom';
import { SMS_SENT } from 'Containers/SignIn/PhoneVerification';
import { UserModel } from 'Containers/User/Models/UserModel';
import { userDetails } from 'Containers/User/actions';

import { inviteCompanyInfoSelector } from 'Containers/SignIn/SignInHow/selector';

const phoneSelector = ({ core }: any) => {
  const error = core?.formErrors?.phone;
  // This deals with the phone array when it's undefined
  return error && Array.isArray(error) ? error : [];
};

const hostName = window.location.hostname;

const PhoneVerificationContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // need user ID to create a phone record for the user
  const user: UserModel = useSelector(({ user: { user = {} } }: any) => user, areEqual);
  const { name: companyName, logoUrl, countryAlpha } = useSelector(inviteCompanyInfoSelector, areEqual);

  useEffect(() => {
    // get user details
    dispatch(userDetails());
  }, []);

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production' && hostName === 'app.rocketplantech.com';

    const script = document.createElement('script');

    if (isProduction) {
      const scriptText = document.createTextNode(
        "gtag('event', 'conversion', {'send_to': 'AW-465765007/kq48CPvrh4gDEI-FjN4B'});"
      );

      script.appendChild(scriptText);
      document.head.appendChild(script);
    }

    return () => {
      if (script && isProduction) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // TODO::detach existing phone records (future)

  // set local error messages without undefined issue
  const errors = {
    phone: useSelector(phoneSelector, areEqual),
  };

  // to disable the submit on api request
  const fetching = useSelector(({ core: { fetching = false } }: any) => fetching, areEqual);

  // determine if the API request is success
  const smsSent = useSelector(({ phoneVerification: { smsSent = false } }: any) => smsSent, areEqual);

  // local variables
  const [phone, setPhone] = useState('');

  // country code selector variables
  // find company country using alpha code because both US and CA use +1 for country code
  const [countryCodeSelectorIsOpen, setCountryCodeSelectorIsOpen] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState(1);
  const [selectedCountryCode, setSelectedCountryCode] = useState(1);
  const [selectedCountryFlag, setSelectedCountryFlag] = useState('usa');

  // set flag and country code based on invite company location
  useEffect(() => {
    if (countryAlpha) {
      const companyCountry = countries.find((country) => country.alpha_2 === countryAlpha);

      if (companyCountry) {
        setSelectedCountryId(companyCountry.id);
        setSelectedCountryCode(companyCountry.code);
        setSelectedCountryFlag(companyCountry.flag);
      }
    }
  }, [countryAlpha]);

  // helpers
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  // set local variables
  const onChangePhone = useCallback((e: any) => {
    const phone = e.target.value.trim();
    setPhone(phone);

    setIsButtonEnabled(phone.length === 0);
  }, []);

  const countryCodetoggleOpenCloseOnClick = useCallback(() => {
    if (!countryAlpha) {
      // no country code from invite detected, can select country code
      setCountryCodeSelectorIsOpen((prevState) => !prevState);
    }
  }, [countryAlpha]);

  const countryCodeSelectOnChange = useCallback(
    ({ currentTarget: { id: countryIdSelected } }: any) => {
      if (!countryAlpha) {
        // no country code from invite detected, can select country code
        const countryId = Number(countryIdSelected);
        const countrySelected = countries.find((country) => country.id === countryId);

        if (countrySelected?.id) {
          const { id, code, flag } = countrySelected;

          setSelectedCountryId(id);
          setSelectedCountryCode(code);
          setSelectedCountryFlag(flag);
          setCountryCodeSelectorIsOpen(false);
        }
      }
    },
    [countries, countryAlpha]
  );

  // submit the form
  const onFormButtonClick = async (e: any) => {
    e.preventDefault();
    dispatch(
      smsSendVerification(
        'auth/sms-send-verification',
        'post',
        {
          phone: `${convertPhoneNumber(`+${selectedCountryCode}`, phone)}`,
        },
        user.id
      )
    );
  };

  // route change
  useEffect(() => {
    if (smsSent) {
      // get user phones
      setTimeout(() => {
        history.push('/phoneverificationcode');
      }, 1000);
    }

    // clean up, so the user can come back to enter a different phone number
    return () => {
      dispatch({
        type: SMS_SENT,
        payload: false,
      });
    };
  }, [smsSent]);

  return (
    <PhoneVerification
      phone={phone}
      companyName={companyName}
      companyLogo={logoUrl}
      isEmployeeSignUp={countryAlpha}
      onChangePhone={onChangePhone}
      onFormButtonClick={onFormButtonClick}
      formErrors={errors}
      fetching={fetching}
      isButtonEnabled={isButtonEnabled}
      countryCodeSelectorIsOpen={countryCodeSelectorIsOpen}
      countryCodeSelectOnChange={countryCodeSelectOnChange}
      countryCodetoggleOpenCloseOnClick={countryCodetoggleOpenCloseOnClick}
      countryCodeCountries={countries}
      selectedCountryId={selectedCountryId}
      selectedCountryCode={selectedCountryCode}
      selectedCountryFlag={selectedCountryFlag}
    />
  );
};

// This allows for default props if they exist
const PhoneVerificationContainerMemo = memo(PhoneVerificationContainer, areEqual);

export { PhoneVerificationContainerMemo as PhoneVerificationContainer };
