import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { EmailAnchor } from 'Components/Anchor/EmailAnchor';
import { PhoneAnchor } from 'Components/Anchor/PhoneAnchor';
import { Roles } from 'Containers/People';

import classes from './employeeCard.module.css';

interface Props {
  id: string;
  avatar: any;
  name: string;
  email?: string;
  phone?: string;
  extension?: string;
  roles: any[];
  selectCardClick: (e: any) => void;
}

const EmployeeCard = ({ id, avatar, name, email, phone, extension, roles, selectCardClick }: Props) => (
  <div
    className={classes.container}
    id={id}
    role="button"
    tabIndex={0}
    onKeyUp={selectCardClick}
    onClick={selectCardClick}
  >
    <div className={classes.header}>
      {avatar}
      <div className={classes.name}>{name}</div>
    </div>
    <Roles roles={roles} className={classes.roleTag} />
    {(email || phone) && (
      <div className={classes.body}>
        {email && (
          <div className={classes.email}>
            <EmailAnchor address={email}>{email}</EmailAnchor>
          </div>
        )}
        {phone && (
          <div className={classes.phone}>
            <PhoneAnchor phone={phone}>
              {phone} {extension?.length > 0 && <span>{`\u2022 Ext ${extension}`}</span>}
            </PhoneAnchor>
          </div>
        )}
      </div>
    )}
  </div>
);
EmployeeCard.defaultProps = {
  email: undefined,
  phone: undefined,
  extension: undefined,
};
const EmployeeCardMemo = memo(EmployeeCard, areEqual);
export { EmployeeCardMemo as EmployeeCard };
