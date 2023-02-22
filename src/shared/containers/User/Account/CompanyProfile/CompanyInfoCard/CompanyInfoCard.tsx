import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { useUser } from 'Context/User';

import { UserModel } from 'Containers/User/Models/UserModel';
import { CompanyInfoCard } from 'Components/Profiles/Account/CompanyProfile/CompanyInfoCard';
import { getCompanyPhones } from 'Containers/Company/actions';
import { companyPhonesSelector } from 'Containers/Company/selectors';
import { formatPhoneInternationalWithCountryCode } from 'Utils/helpers';

const CompanyInfoCardContainer = () => {
  const dispatch = useDispatch();

  const user: UserModel = useUser();

  const companyPhoneNumbers = useSelector(companyPhonesSelector, areEqual);

  const [companyName, setCompanyName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [userCompanyAddress, setUserCompanyAddress] = useState('');
  const [companyAddress, setCompanyAddress] = useState(undefined);

  useEffect(() => {
    if (user?.id) {
      const { companies } = user;

      if (companies.length > 0) {
        const [company] = companies;
        const { id, address, name, website } = company;
        if (address) {
          setCompanyAddress(address);
        }
        dispatch(getCompanyPhones(id));
        setCompanyName(name);
        setCompanyWebsite(website);
      }
    }
  }, [user]);

  useEffect(() => {
    if (companyPhoneNumbers.length > 0) {
      const [phone] = companyPhoneNumbers;
      const { country_code: code, value } = phone;
      setCompanyPhone(formatPhoneInternationalWithCountryCode(code, value));
    }
  }, [companyPhoneNumbers]);

  useEffect(() => {
    if (companyAddress?.id) {
      const { address, zip, city, state, country }: any = companyAddress;
      setUserCompanyAddress(`${address}, ${zip}, ${city}, ${state}, ${country}`);
    }
  }, [companyAddress]);

  return (
    <CompanyInfoCard
      companyName={companyName}
      companyPhone={companyPhone}
      companyWebsite={companyWebsite}
      companyAddress={userCompanyAddress}
    />
  );
};
const CompanyInfoCardContainerMemo = memo(CompanyInfoCardContainer, areEqual);

export { CompanyInfoCardContainerMemo as CompanyInfoCardContainer };
