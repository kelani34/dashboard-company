import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { PurpleButton, DarkPurpleButton } from 'Components/Button';
import { UserInfoCard } from 'Containers/User/Account/UserProfile/UserInfoCard';
import { AvatarOrInitials } from 'Components/Avatar';
import { EditUserInfo } from './EditUserInfo';

import classes from './userProfile.module.css';

interface Props {
  userAvatar: any;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  userEditable;
  formErrors: any;
  countryId: number;
  countryCode: any;
  countryFlag: string;
  onEditUserClick: (e: any) => void;
  onFormSubmit: (e: any) => void;
  onCancelClick: (e: any) => void;
  onChangeFirstName: (e: any) => void;
  onChangeLastName: (e: any) => void;
  onChangePhone: (e: any) => void;
  onChangeEmail: (e: any) => void;
}

const UserProfile = ({
  userAvatar,
  firstName,
  lastName,
  phone,
  email,
  userEditable,
  formErrors,
  countryId,
  countryCode,
  countryFlag,
  onEditUserClick,
  onFormSubmit,
  onCancelClick,
  onChangeFirstName,
  onChangeLastName,
  onChangePhone,
  onChangeEmail,
}: Props) => (
  <form className={classes.container}>
    {!userEditable ? (
      <DarkPurpleButton className={classes.editButton} onClick={onEditUserClick} type="button">
        Edit
      </DarkPurpleButton>
    ) : (
      <div className={classes.buttons}>
        <PurpleButton className={classes.saveButton} onClick={onFormSubmit} type="submit">
          Save Changes
        </PurpleButton>
        <span>
          <DarkPurpleButton className={classes.cancelButton} onClick={onCancelClick} type="button">
            Cancel
          </DarkPurpleButton>
        </span>
      </div>
    )}
    <h2 className={classes.header}>Personal Account</h2>
    <div className={classes.components}>
      <div className={classes.avatarContainer}>
        <AvatarOrInitials
          avatarClassName={userAvatar ? classes.avatar : classes.initials}
          avatar={userAvatar}
          firstName={firstName}
          lastName={lastName}
        />
      </div>
      {!userEditable ? (
        <UserInfoCard />
      ) : (
        <EditUserInfo
          firstName={firstName}
          lastName={lastName}
          phone={phone}
          email={email}
          formErrors={formErrors}
          countryCode={countryCode}
          countryId={countryId}
          countryFlag={countryFlag}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangePhone={onChangePhone}
          onChangeEmail={onChangeEmail}
        />
      )}
    </div>
  </form>
);

const UserProfileMemo = memo(UserProfile, areEqual);

export { UserProfileMemo as UserProfile };
