import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Avatar } from 'Components/Avatar';
import { initials } from 'Utils/helpers';

import { Roles } from 'Containers/People';
import { Icon } from 'Components/Icons';
import classes from './employeeRow.module.css';

const getAvatar = (avatar, firstName, lastName) =>
  avatar ? (
    <Avatar avatar={avatar} className={classes.avatar} />
  ) : (
    <div className={classes.initials}>{initials(firstName, lastName)}</div>
  );

interface Props {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  roles: any[];
  selectedMembers: any[];
  onClickMemberRow: (e: any) => void;
}

const EmployeeRow = ({
  id,
  firstName,
  lastName,
  fullName,
  avatar,
  roles,
  selectedMembers,
  onClickMemberRow,
}: Props) => (
  <div
    id={id}
    className={classes.memberRowBase}
    role="button"
    onClick={onClickMemberRow}
    onKeyUp={onClickMemberRow}
    tabIndex={0}
  >
    <div className={classes.memberDetails}>
      {getAvatar(avatar, firstName, lastName)}
      <p className={classes.name}>{fullName}</p>
    </div>
    <div className="d-inline-flex">
      <Roles roles={roles} className={classes.roleTags} />
      <Icon type={selectedMembers.includes(id) ? 'checkmarkpurplebg' : 'circle'} />
    </div>
  </div>
);

const EmployeeRowMemo = memo(EmployeeRow, areEqual);

export { EmployeeRowMemo as EmployeeRow };
