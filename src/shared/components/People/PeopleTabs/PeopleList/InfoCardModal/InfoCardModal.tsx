import React, { memo } from 'react';

import { Modal } from 'Components/Modal';
import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button';
import { EmailAnchor } from 'Components/Anchor/EmailAnchor';
import { PhoneAnchor } from 'Components/Anchor/PhoneAnchor';
import { Icon } from 'Components/Icons';

import { AvatarOrInitials } from 'Components/Avatar';
import { Roles } from 'Containers/People';

import classes from './infoCardModal.module.css';

interface Props {
  id: string;
  title: string;
  avatar?: any;
  name: string;
  companyName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  flag?: string;
  phone?: string;
  extension?: string;
  roles?: any[];
  isAdmin?: boolean;
  isACompany?: boolean;
  isOpen: boolean;
  modalCloseClick: (e: any) => void;
  onEditButtonClick?: (e: any) => void;
}
const InfoCardModal = ({
  id,
  title,
  isOpen,
  avatar,
  name,
  companyName,
  firstName,
  lastName,
  email,
  isACompany,
  flag,
  phone,
  extension,
  roles,
  isAdmin,
  modalCloseClick,
  onEditButtonClick,
}: Props) => {
  const avatarInUse = <AvatarOrInitials avatar={avatar} firstName={firstName} lastName={lastName} />;

  return (
    <div className={classes.infoCardModalWrapper}>
      <Modal
        id={id && id.toString()}
        classes={classes}
        title={`View ${title}`}
        isOpen={isOpen}
        modalHeader
        leftHeaderIcon="personpurple"
        dataBsBackdrop="static"
        dataBsKeyboard="false"
        modalCloseClick={modalCloseClick}
      >
        <div className={`d-flex justify-content-start align-items-center pb-2 ${classes.infoModalHeader}`}>
          {firstName && <span className={classes.initials}>{avatarInUse}</span>}
          <span className={classes.headerName}>{isACompany ? companyName : name}</span>

          <Roles roles={roles} className={classes.roleTag} />
        </div>

        <div
          className={`d-flex flex-column justify-content-between align-items-center h-100 ${classes.buttonsWrapper}`}
        >
          {email && (
            <EmailAnchor className={`${classes.modalButtons} ${classes.modalPill} ${classes.email}`} address={email}>
              {email}
            </EmailAnchor>
          )}

          {phone && (
            <PhoneAnchor className={`${classes.modalButtons} ${classes.modalPill} ${classes.phone}`} phone={phone}>
              <Icon className={classes.flag} type={flag} /> {phone}{' '}
              {extension && <span>{`\u2022 Ext ${extension}`}</span>}
            </PhoneAnchor>
          )}

          {title === 'Contact' || (title === 'Employee' && isAdmin) ? (
            <PurpleButton outlined className={`${classes.modalButtons} ${classes.edit}`} onClick={onEditButtonClick}>
              Edit
            </PurpleButton>
          ) : (
            <div className={classes.nonAdmin} />
          )}
        </div>
      </Modal>
    </div>
  );
};
InfoCardModal.defaultProps = {
  avatar: undefined,
  firstName: undefined,
  isACompany: false,
  companyName: undefined,
  lastName: undefined,
  email: undefined,
  flag: undefined,
  phone: undefined,
  extension: undefined,
  roles: [],
  isAdmin: undefined,
  onEditButtonClick: undefined,
};
const InfoCardModalMemo = memo(InfoCardModal, areEqual);

export { InfoCardModalMemo as InfoCardModal };
