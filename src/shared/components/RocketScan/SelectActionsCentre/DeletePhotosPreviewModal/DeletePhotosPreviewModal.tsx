import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';

import { Modal } from 'Components/Modal';
import { SelectedPhotos } from 'Containers/RocketScan';
import { DeleteButton, CancelButton } from 'Components/Button';

import classes from './deletePhotosPreviewModal.module.css';

interface Props {
  isOpen?: boolean;
  photosCount: number;
  onClickCloseDeletePhotos: (e: any) => void;
  onClickDeleteButton: (e: any) => void;
}

const DeletePhotosPreviewModal = ({
  isOpen = false,
  photosCount,
  onClickCloseDeletePhotos,
  onClickDeleteButton,
}: Props) => (
  <Modal
    id="deltePhotosPreviewModal"
    classes={classes}
    title="Delete Photos?"
    isOpen={isOpen}
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    leftHeaderIcon=""
    modalHeader
    modalCloseClick={onClickCloseDeletePhotos}
    toast=""
  >
    <div>
      <div className={classes.selectedAmount}>{photosCount} Photos Selected</div>
      <div className={classes.selectedPhotos}>
        <SelectedPhotos />
      </div>
      <div className={classes.warningLable}>This action cannot be undone.</div>
      <div className={`d-flex justify-content-between align-items-center ${classes.buttonContent}`}>
        <DeleteButton className={classes.deletePhotosBtn} onClick={onClickDeleteButton}>
          Delete
        </DeleteButton>
        <CancelButton className={classes.cancelButton} onClick={onClickCloseDeletePhotos}>
          Cancel
        </CancelButton>
      </div>
    </div>
  </Modal>
);

DeletePhotosPreviewModal.defaultProps = {
  isOpen: false,
};

const DeletePhotosPreviewModalMemo = memo(DeletePhotosPreviewModal, areEqualShallow);

export { DeletePhotosPreviewModalMemo as DeletePhotosPreviewModal };
