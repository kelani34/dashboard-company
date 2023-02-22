import React, { memo, useCallback, useEffect, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { useUser } from 'Context/User';
import { UserModel } from 'Containers/User/Models/UserModel';
import { AvatarOrInitials } from 'Components/Avatar';
import { convertPhoneNumber, formatPhoneInternationalWithCountryCode } from 'Utils/helpers';

import { EmployeeCard } from 'Components/People';

interface Props {
  employee: any;
  onClickEmployeeCard: (employee: any) => void;
}

const EmployeeCardContainer = ({ employee, onClickEmployeeCard }: Props) => {
  const user: UserModel = useUser();

  const [phoneNumber, setPhoneNumber] = useState('');

  const { id, avatar, firstName, lastName, fullName, email, primaryPhone, primaryPhoneExtension, roles } = employee;

  // format phone number
  useEffect(() => {
    if (user?.id) {
      const { companies } = user;
      if (companies.length > 0) {
        const [company] = companies;
        const { country_code: countryCode } = company;
        const phoneFormatted = convertPhoneNumber(countryCode, primaryPhone);

        setPhoneNumber(formatPhoneInternationalWithCountryCode(countryCode, phoneFormatted.toString()));
      }
    }
  }, [user, primaryPhone]);

  const onClickCard = useCallback(() => {
    onClickEmployeeCard(employee);
  }, [employee]);

  return (
    <EmployeeCard
      id={id}
      avatar={<AvatarOrInitials avatar={avatar} firstName={firstName} lastName={lastName} />}
      name={fullName}
      email={email}
      phone={phoneNumber}
      roles={roles}
      extension={primaryPhoneExtension}
      selectCardClick={onClickCard}
    />
  );
};

const EmployeeCardContainerMemo = memo(EmployeeCardContainer, areEqual);

export { EmployeeCardContainerMemo as EmployeeCard };
