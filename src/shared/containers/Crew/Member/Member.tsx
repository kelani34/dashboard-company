import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { UserModel } from 'Containers/User/Models/UserModel';
import { EmployeeCard } from 'Components/People/PeopleTabs/EmployeeCard';
import { AvatarOrInitials } from 'Components/Avatar';
import { formatPhoneInternationalWithCountryCode } from 'Utils/helpers';

interface Props {
  member: UserModel;
  onClickMember: (e: any) => void;
}

const MemberContainer = ({ member, onClickMember }: Props) => {
  const {
    id,
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
    avatar_url: avatar,
    email,
    phones,
    roles,
  } = member;

  let formattedPhoneNumber;
  let extension;
  if (phones.length > 0) {
    const [phone] = phones;

    const { value: phoneNumber, country_code: code } = phone;

    extension = phone.extension;
    formattedPhoneNumber = formatPhoneInternationalWithCountryCode(code, phoneNumber);
  }

  const onClick = useCallback(() => {
    onClickMember(member);
  }, []);

  return (
    <EmployeeCard
      id={id.toString()}
      avatar={<AvatarOrInitials avatar={avatar || ''} firstName={firstName} lastName={lastName} />}
      name={fullName}
      email={email}
      phone={formattedPhoneNumber}
      extension={extension}
      roles={roles}
      selectCardClick={onClick}
    />
  );
};

const MemberContainerMemo = memo(MemberContainer, areEqual);

export { MemberContainerMemo as MemberContainer };
