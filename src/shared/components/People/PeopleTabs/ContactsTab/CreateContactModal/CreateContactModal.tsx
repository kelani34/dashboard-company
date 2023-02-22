import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Modal } from 'Components/Modal';
import { CreateContact } from 'Containers/People/PeopleTabs/ContactsTab';
import { ContactTypeToast } from 'Components/People/PeopleTabs/ContactsTab';

import classes from './createContactModal.module.css';

interface Props {
  contactTypeIcon?: string;
  showContactTypeToast: boolean;
  isOpenCreateContact: boolean;
  onClickCloseCreatContact: (e: any) => void;
  onClickCloseToast: (e: any) => void;
}

const CreateContactModal = ({
  contactTypeIcon,
  showContactTypeToast,
  isOpenCreateContact,
  onClickCloseCreatContact,
  onClickCloseToast,
}: Props) => (
  <Modal
    id="create-contact-modal"
    classes={classes}
    title="Add Contact"
    isOpen={isOpenCreateContact}
    modalHeader
    leftHeaderIcon={contactTypeIcon}
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={onClickCloseCreatContact}
    toast={<ContactTypeToast showContactTypeToast={showContactTypeToast} onClickCloseToast={onClickCloseToast} />}
  >
    <CreateContact />
  </Modal>
);

CreateContactModal.defaultProps = {
  contactTypeIcon: 'peoplepinksmall',
};

const CreateContactModalMemo = memo(CreateContactModal, areEqual);

export { CreateContactModalMemo as CreateContactModal };
