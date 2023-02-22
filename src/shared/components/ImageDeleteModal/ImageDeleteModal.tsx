import React, { memo } from 'react';

import { Modal } from 'Components/Modal';

import { areEqual } from 'Utils/equalityChecks';
import { Button } from 'Components/Button';
import classes from './imageDeleteModal.module.css';

interface Props {
  id: number;
  isOpen: boolean;
  modalCloseClick: (e: any) => void;
  onDeleteButtonClick: (e: any) => void;
}
const ImageDeleteModal = ({ id, isOpen, modalCloseClick, onDeleteButtonClick }: Props) => (
  <div className={classes.deleteModalWrapper}>
    <Modal
      id={id && id.toString()}
      classes={classes}
      title="Delete Photo?"
      isOpen={isOpen}
      modalHeader
      modalFooter
      closeButtonText="Cancel"
      leftHeaderIcon="trash"
      dataBsBackdrop="static"
      dataBsKeyboard="false"
      modalCloseClick={modalCloseClick}
    >
      <div className={classes.deleteModalCopy}>
        <p>Are you sure you want to delete this photo?</p>
        <p>You cannot undo this action</p>
      </div>

      <Button className={`${classes.modalButtons} ${classes.delete}`} onClick={onDeleteButtonClick}>
        Delete
      </Button>
    </Modal>
  </div>
);

const ImageDeleteModalMemo = memo(ImageDeleteModal, areEqual);

export { ImageDeleteModalMemo as ImageDeleteModal };
