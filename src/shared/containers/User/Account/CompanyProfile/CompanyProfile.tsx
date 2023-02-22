import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { useUser } from 'Context/User';

import { UserModel } from 'Containers/User/Models/UserModel';
import { convertPhoneNumber, formatPhoneInternationalWithCountryCode } from 'Utils/helpers';
import { CompanyProfile } from 'Components/Profiles/Account/CompanyProfile';
import {
  updateCompanyDetails,
  createCompanyPhone,
  createCompanyAddress,
  updateCompanyAddress,
  updateCompanyPhone,
  setCompanyUpdated,
  setCompanyAddressUpdated,
  setCompanyAddressCreated,
  setCompanyPhoneUpdated,
  setCompanyPhoneCreated,
} from 'Containers/Company/actions';
import {
  companyPhonesSelector,
  companyUpdatedSelector,
  companyAddressCreatedSelector,
  companyPhoneCreatedSelector,
  companyAddressUpdatedSelector,
  companyPhoneUpdatedSelector,
  companyNameErrorSelector,
  companyPhoneErrorSelector,
  companyWebsiteErrorSelector,
  companyAddressErrorSelector,
  companyAddressSecondErrorSelector,
  companyCountryErrorSelector,
  companyStateErrorSelector,
  companyCityErrorSelector,
  companyCodeErrorSelector,
} from 'Containers/Company/selectors';
import { userDetails } from 'Containers/User/actions';
import { countries } from 'Utils/data';
import { isCompanyAdmin } from 'Utils/roles';

const CompanyProfileContainer = () => {
  const dispatch = useDispatch();

  const user: UserModel = useUser();
  const companyPhoneNumbers = useSelector(companyPhonesSelector, areEqual);

  const companyPhoneCreated = useSelector(companyPhoneCreatedSelector, areEqual);
  const companyAddressCreated = useSelector(companyAddressCreatedSelector, areEqual);
  const companyUpdated = useSelector(companyUpdatedSelector, areEqual);
  const companyPhoneUpdated = useSelector(companyPhoneUpdatedSelector, areEqual);
  const companyAddressUpdated = useSelector(companyAddressUpdatedSelector, areEqual);

  const [companyAvatar, setCompanyAvatar] = useState(null);
  const [companyIsEditable, setCompanyIsEditable] = useState(false);
  const [companyName, setCompanyName] = useState('');

  const [companyPhoneId, setCompanyPhoneId] = useState(null);
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');

  const [companyAddressId, setCompanyAddressId] = useState(null);
  const [companyAddress, setCompanyAddress] = useState(undefined);
  const [companyAddressPrimary, setCompanyAddressPrimary] = useState('');
  const [companyAddressSecond, setCompanyAddressSecond] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [companyZip, setCompanyZip] = useState('');
  const [companyId, setCompanyId] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [countryId, setCountryId] = useState(1);
  const [countryCode, setCountryCode] = useState('');
  const [companyCountryCode, setCompanyCountryCode] = useState(1);
  const [countryFlag, setCountryFlag] = useState('usa');
  const [companyAdmin, setCompanyAdmin] = useState(false);

  const errors = {
    companyName: useSelector(companyNameErrorSelector, areEqual),
    companyPhone: useSelector(companyPhoneErrorSelector, areEqual),
    companyWebsite: useSelector(companyWebsiteErrorSelector, areEqual),
    companyAddress: useSelector(companyAddressErrorSelector, areEqual),
    companyAddressSecond: useSelector(companyAddressSecondErrorSelector, areEqual),
    companyCountry: useSelector(companyCountryErrorSelector, areEqual),
    companyState: useSelector(companyStateErrorSelector, areEqual),
    companyCity: useSelector(companyCityErrorSelector, areEqual),
    companyZip: useSelector(companyCodeErrorSelector, areEqual),
  };

  // Set Company Details Values
  useEffect(() => {
    if (user?.id) {
      const { companies } = user;

      if (companies.length > 0) {
        const [company] = companies;
        const {
          logo_url: companyLogo,
          id,
          name,
          website,
          address,
          country_alpha_2: countryAlphaTwo,
          country_code: code,
        } = company;
        setCompanyId(id);
        setCompanyName(name);
        setCompanyWebsite(website || '');
        setCountryCode(code);
        if (address) {
          setCompanyAddress(address);
        }
        setCompanyAvatar(companyLogo);

        const countryAlpha = countryAlphaTwo;
        const companyCountry = countries.find((country) => country.alpha_2 === countryAlpha);

        if (companyCountry?.id) {
          const { id, flag, code } = companyCountry;

          setCountryId(id);
          setCompanyCountryCode(code);
          setCountryFlag(flag);
        }
      }
      setCompanyAdmin(isCompanyAdmin(user?.roles));
    }
  }, [user]);

  // Set Company Phone Values
  useEffect(() => {
    if (companyPhoneNumbers.length > 0) {
      const [phone] = companyPhoneNumbers;
      const { id, value, country_code: code } = phone;
      setCompanyPhoneId(id);
      setCompanyPhone(formatPhoneInternationalWithCountryCode(code, value));
    }
  }, [companyPhoneNumbers]);

  // Set Company Address Values
  useEffect(() => {
    if (companyAddress?.id) {
      const { id, address, zip, city, state, country }: any = companyAddress;
      setCompanyAddressId(id);
      setCompanyAddressPrimary(address);
      setCompanyZip(zip);
      setCompanyCity(city);
      setSelectedState(state);
      setSelectedCountry(country);
    }
  }, [companyAddress]);

  // Go back to Company Profile info and created/updated reset status
  useEffect(() => {
    if (
      companyUpdated &&
      (companyPhoneUpdated || companyPhoneCreated) &&
      (companyAddressUpdated || companyAddressCreated)
    ) {
      dispatch(userDetails());
      setCompanyIsEditable(false);
    }
    return () => {
      if (
        companyUpdated &&
        (companyPhoneUpdated || companyPhoneCreated) &&
        (companyAddressUpdated || companyAddressCreated)
      ) {
        dispatch(setCompanyUpdated(false));
        dispatch(setCompanyPhoneCreated(false));
        dispatch(setCompanyPhoneUpdated(false));
        dispatch(setCompanyAddressCreated(false));
        dispatch(setCompanyAddressUpdated(false));
      }
    };
  }, [
    companyIsEditable,
    companyUpdated,
    companyPhoneUpdated,
    companyPhoneCreated,
    companyAddressCreated,
    companyAddressUpdated,
  ]);

  const onEditCompanyClick = useCallback(
    (e: any) => {
      e.preventDefault();
      setCompanyIsEditable(true);
    },
    [companyIsEditable]
  );

  // Set Editable false and reset input values
  const onCancelClick = useCallback(
    (e: any) => {
      e.preventDefault();
      setCompanyIsEditable(false);
    },
    [companyIsEditable]
  );

  const onChangeCompanyName = useCallback(({ target: { value } }) => {
    setCompanyName(value);
  }, []);

  const onChangeCompanyPhone = useCallback((e: any) => {
    const { value } = e.target;
    setCompanyPhone(value);
  }, []);

  const onChangeCompanyWebsite = useCallback((e: any) => {
    const { value } = e.target;
    setCompanyWebsite(value);
  }, []);

  const onChangeCompanyAddress = useCallback((e: any) => {
    const { value } = e.target;
    setCompanyAddressPrimary(value);
  }, []);

  const onChangeCompanyAddressSecond = useCallback((e: any) => {
    const { value } = e.target;
    setCompanyAddressSecond(value);
  }, []);

  const onChangeCompanyCity = useCallback((e: any) => {
    const { value } = e.target;
    setCompanyCity(value);
  }, []);

  const onChangeCompanyZip = useCallback((e: any) => {
    const { value } = e.target;
    setCompanyZip(value);
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      dispatch(
        updateCompanyDetails(companyId, {
          name: companyName,
          website: companyWebsite,
        })
      );

      if (companyPhoneNumbers.length === 0) {
        dispatch(
          createCompanyPhone(companyId, {
            value: convertPhoneNumber(countryCode, companyPhone),
            extension: '',
            is_primary: true,
            type: 'landline',
          })
        );
      }
      if (companyPhoneNumbers.length > 0) {
        dispatch(
          updateCompanyPhone(companyPhoneId, {
            value: convertPhoneNumber(countryCode, companyPhone),
            extension: '',
            is_primary: true,
            type: 'landline',
          })
        );
      }
      if (!companyAddress) {
        dispatch(
          createCompanyAddress(companyId, {
            address: companyAddressPrimary,
            address_2: companyAddressSecond,
            country: selectedCountry,
            state: selectedState,
            city: companyCity,
            zip: companyZip,
          })
        );
      }
      if (companyAddress) {
        dispatch(
          updateCompanyAddress(companyAddressId, {
            address: companyAddressPrimary,
            address_2: companyAddressSecond,
            country: selectedCountry,
            state: selectedState,
            city: companyCity,
            zip: companyZip,
          })
        );
      }
    },
    [
      companyName,
      companyWebsite,
      companyAddress,
      companyPhoneNumbers,
      companyPhoneId,
      companyPhone,
      companyId,
      selectedCountry,
      companyAddressId,
      companyAddressPrimary,
      companyAddressSecond,
      selectedState,
      companyCity,
      companyZip,
    ]
  );

  return (
    <CompanyProfile
      companyAvatar={companyAvatar}
      companyName={companyName}
      companyPhone={companyPhone}
      companyWebsite={companyWebsite}
      companyAddress={companyAddressPrimary}
      companyAddressSecond={companyAddressSecond}
      companyCountry={selectedCountry}
      companyState={selectedState}
      companyCity={companyCity}
      companyZip={companyZip}
      companyEditable={companyIsEditable}
      formErrors={errors}
      isCompanyAdmin={companyAdmin}
      onEditCompanyClick={onEditCompanyClick}
      onFormSubmit={onFormSubmit}
      onCancelClick={onCancelClick}
      onChangeCompanyName={onChangeCompanyName}
      onChangeCompanyPhone={onChangeCompanyPhone}
      onChangeCompanyWebsite={onChangeCompanyWebsite}
      onChangeCompanyAddress={onChangeCompanyAddress}
      onChangeCompanyAddressSecond={onChangeCompanyAddressSecond}
      setSelectedCountry={setSelectedCountry}
      setSelectedProvince={setSelectedState}
      onChangeCompanyCity={onChangeCompanyCity}
      onChangeCompanyZip={onChangeCompanyZip}
      countryCode={companyCountryCode}
      countryId={countryId}
      countryFlag={countryFlag}
    />
  );
};

const CompanyProfileContainerMemo = memo(CompanyProfileContainer, areEqual);

export { CompanyProfileContainerMemo as CompanyProfileContainer };
