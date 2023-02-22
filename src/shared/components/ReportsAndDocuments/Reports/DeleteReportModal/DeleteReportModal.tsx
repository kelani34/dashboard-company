import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Modal } from 'Components/Modal';
import { DarkPurpleButton, DeleteButton } from 'Components/Button';

import classes from './deleteReportModal.module.css';

interface Props {
  loading: boolean;
  showDeleteModal: boolean;
  reportName: string;
  onDeleteButtonClick: (e: any) => void;
  onCancelButtonClick: (e: any) => void;
  modalCloseClick: (e: any) => void;
}

const DeleteReportModal = ({
  loading,
  showDeleteModal,
  reportName,
  onDeleteButtonClick,
  onCancelButtonClick,
  modalCloseClick,
}: Props) => (
  <Modal
    title="Delete Report?"
    isOpen={showDeleteModal}
    classes={classes}
    modalHeader
    modalCloseClick={modalCloseClick}
  >
    <div>
      <p>{reportName}</p>
      <p>This action cannot be undone</p>
    </div>
    <div className="d-flex w-100 justify-content-center">
      <DeleteButton onClick={onDeleteButtonClick} className={classes.buttons} disabled={loading}>
        Delete
      </DeleteButton>
      <DarkPurpleButton onClick={onCancelButtonClick} className={classes.buttons} disabled={loading}>
        Cancel
      </DarkPurpleButton>
    </div>
  </Modal>
);

const DeleteReportModalMemo = memo(DeleteReportModal, areEqual);

export { DeleteReportModalMemo as DeleteReportModal };
