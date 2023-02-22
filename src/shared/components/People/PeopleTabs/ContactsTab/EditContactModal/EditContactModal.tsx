import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Modal } from 'Components/Modal';
import { EditContact } from 'Containers/People/PeopleTabs/ContactsTab';
import { ContactTypeToast } from 'Components/People/PeopleTabs/ContactsTab';

import classes from './editContactModal.module.css';

interface Props {
  contactTypeIcon?: string;
  showContactTypeToast: boolean;
  isOpenEditContact: boolean;
  onClickCloseEditContact: (e: any) => void;
  onClickCloseToast: (e: any) => void;
}

const EditContactModal = ({
  contactTypeIcon,
  showContactTypeToast,
  isOpenEditContact,
  onClickCloseEditContact,
  onClickCloseToast,
}: Props) => (
  <Modal
    id="edit-contact-modal"
    classes={classes}
    title="Edit Contact"
    isOpen={isOpenEditContact}
    modalHeader
    leftHeaderIcon={contactTypeIcon}
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={onClickCloseEditContact}
    toast={<ContactTypeToast showContactTypeToast={showContactTypeToast} onClickCloseToast={onClickCloseToast} />}
  >
    <EditContact />
  </Modal>
);

EditContactModal.defaultProps = {
  contactTypeIcon: 'peoplepinksmall',
};

const EditContactModalModalMemo = memo(EditContactModal, areEqual);

export { EditContactModalModalMemo as EditContactModal };
