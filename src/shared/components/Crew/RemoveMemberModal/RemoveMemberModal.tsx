import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Modal } from 'Components/Modal';
import { EmailAnchor } from 'Components/Anchor/EmailAnchor';
import { PhoneAnchor } from 'Components/Anchor/PhoneAnchor';
import { DeleteButton } from 'Components/Button';
import { Icon } from 'Components/Icons';
import { Roles } from 'Containers/People';

import classes from './removeMemberModal.module.css';

interface Props {
  id: string;
  avatar?: any;
  name: string;
  email?: string;
  flag: string;
  phone?: string;
  extension?: string;
  roles: any[];
  isOpen: boolean;
  fetching: boolean;
  modalCloseClick: (e: any) => void;
  onClickRemoveProject: (e: any) => void;
}

const RemoveMemberModal = ({
  id,
  isOpen,
  fetching,
  avatar,
  name,
  email,
  flag,
  phone,
  extension,
  roles,
  modalCloseClick,
  onClickRemoveProject,
}: Props) => (
  <div className={classes.container}>
    <Modal
      id={id && id.toString()}
      classes={classes}
      title="View Crew Member"
      isOpen={isOpen}
      modalHeader
      leftHeaderIcon="crew"
      dataBsBackdrop="static"
      dataBsKeyboard="false"
      modalCloseClick={modalCloseClick}
    >
      <div className={`d-flex justify-content-start align-items-center pb-2 ${classes.infoModalHeader}`}>
        {avatar}
        <span className={classes.headerName}>{name}</span>
        <Roles roles={roles} className={classes.roleTag} />
      </div>

      <div className={`d-flex flex-column justify-content-between align-items-center h-100 ${classes.buttonsWrapper}`}>
        {email && (
          <EmailAnchor className={`${classes.modalButtons} ${classes.modalPill} ${classes.email}`} address={email}>
            {email}
          </EmailAnchor>
        )}

        {phone && (
          <PhoneAnchor className={`${classes.modalButtons} ${classes.modalPill} ${classes.phone}`} phone={phone}>
            <Icon className={classes.flag} type={flag} />
            {phone} {extension && <span>{`\u2022 Ext ${extension}`}</span>}
          </PhoneAnchor>
        )}
        <DeleteButton className={classes.removeButton} onClick={onClickRemoveProject} disabled={fetching}>
          Remove From Project
        </DeleteButton>
      </div>
    </Modal>
  </div>
);

RemoveMemberModal.defaultProps = {
  avatar: undefined,
  email: 'email@example.com',
  phone: '999 999 9999',
  extension: undefined,
};

const RemoveMemberModalMemo = memo(RemoveMemberModal, areEqual);

export { RemoveMemberModalMemo as RemoveMemberModal };
