import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button';

import classes from './userInfoCard.module.css';

interface Props {
  fullName: string;
  phone: any;
  email: string;
  onLogOutClick: (e: any) => void;
}

const UserInfoCard = ({ fullName, phone, email, onLogOutClick }: Props) => (
  <div>
    <div className={classes.information}>
      <div className={classes.name}>{fullName}</div>
      <div className={classes.description}>
        Phone Number:
        <span className={classes.details}>{phone}</span>
      </div>
      <div className={classes.description}>
        Work Email:
        <span className={classes.details}>{email}</span>
      </div>
    </div>
    <PurpleButton className={classes.logOutButton} type="button" onClick={onLogOutClick} outlined>
      Log Out
    </PurpleButton>
  </div>
);

const UserInfoCardMemo = memo(UserInfoCard, areEqual);

export { UserInfoCardMemo as UserInfoCard };
