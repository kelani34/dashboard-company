import React, { memo } from 'react';

import { Modal } from 'Components/Modal';
import { areEqual } from 'Utils/equalityChecks';
import { Button } from 'Components/Button';

import classes from './deleteCardModal.module.css';

interface Props {
  id: string;
  title: string;
  name: string;
  isOpen: boolean;
  coreFetching?: boolean;
  modalCloseClick: (e: any) => void;
  onDeleteButtonClick?: (e: any) => void;
}
const DeleteCardModal = ({
  id,
  title,
  isOpen,
  coreFetching,
  name = 'Devon Fung',
  modalCloseClick,
  onDeleteButtonClick,
}: Props) => (
  <div className={classes.deleteCardModalWrapper}>
    <Modal
      id={id && id.toString()}
      classes={classes}
      title={`Delete ${title}?`}
      isOpen={isOpen}
      modalHeader
      modalFooter
      footerButtons={
        <Button
          className={`${classes.delete}`}
          id={id && id.toString()}
          onClick={onDeleteButtonClick}
          disabled={coreFetching}
        >
          Delete
        </Button>
      }
      closeButtonText="Cancel"
      dataBsBackdrop="static"
      dataBsKeyboard="false"
      modalCloseClick={modalCloseClick}
    >
      <div className={classes.deleteModalCopy}>
        <p>
          Are you sure you want to delete {name} from your {title === 'employee' ? 'company?' : 'contacts list?'}
        </p>
      </div>
    </Modal>
  </div>
);
DeleteCardModal.defaultProps = {
  coreFetching: false,
  onDeleteButtonClick: undefined,
};
const DeleteCardModalMemo = memo(DeleteCardModal, areEqual);

export { DeleteCardModalMemo as DeleteCardModal };
