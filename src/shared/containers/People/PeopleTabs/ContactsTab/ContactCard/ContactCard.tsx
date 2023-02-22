import React, { memo, useCallback, useEffect, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { useUser } from 'Context/User';
import { UserModel } from 'Containers/User/Models/UserModel';
import { convertPhoneNumber, formatPhoneInternationalWithCountryCode } from 'Utils/helpers';

import { ContactCard } from 'Components/People/PeopleTabs/ContactsTab/ContactCard/ContactCard';

interface Props {
  contact: any;
  recentlyAdded: string;
  onClickContactCard: (e: any) => void;
}

const ContactCardContainer = ({ contact, recentlyAdded, onClickContactCard }: Props) => {
  const user: UserModel = useUser();

  const [phoneNumber, setPhoneNumber] = useState('');

  const { id, companyName, isCompany, fullName, email, phone, extension } = contact;

  // format phone number
  useEffect(() => {
    if (user?.id) {
      const { companies } = user;
      if (companies.length > 0) {
        const [company] = companies;
        const { country_code: countryCode } = company;
        const phoneFormatted = convertPhoneNumber(countryCode, phone);
        setPhoneNumber(formatPhoneInternationalWithCountryCode(countryCode, phoneFormatted.toString()));
      }
    }
  }, [user, phone]);

  const onClickCard = useCallback(() => {
    if (onClickContactCard) onClickContactCard(contact);
  }, [contact]);

  return (
    <ContactCard
      id={id.toString()}
      recentlyAdded={recentlyAdded}
      companyName={companyName}
      isCompany={isCompany}
      fullName={fullName}
      email={email}
      phone={phoneNumber}
      extension={extension}
      selectCardClick={onClickCard}
    />
  );
};

const ContactCardContainerMemo = memo(ContactCardContainer, areEqual);

export { ContactCardContainerMemo as ContactCard };
