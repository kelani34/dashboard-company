import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { DarkPurpleButton, PurpleButton } from 'Components/Button';
import { Modal } from 'Components/Modal';

import { PhotoFileSizeMenu } from 'Components/PhotoFileSizeMenu';

import classes from './photoDownloadModal.module.css';

interface Props {
  isOpen: boolean;
  email: string;
  selectedSize: string;
  canDownload: boolean;
  fetching: boolean;
  success: boolean;
  onClickSize: (e: any) => void;
  onClickDownload: (e: any) => void;
  onCloseModal: (e: any) => void;
}

const PhotoDownloadModal = ({
  isOpen,
  email,
  selectedSize,
  canDownload,
  fetching,
  success,
  onClickSize,
  onClickDownload,
  onCloseModal,
}: Props) => (
  <Modal
    classes={classes}
    title="Download Project Photos"
    isOpen={isOpen}
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalHeader
    modalCloseClick={onCloseModal}
  >
    {success ? (
      <>
        <div className={classes.text}>
          You will receive an email with links to download your photos once they are ready!
        </div>
        <div className="d-flex justify-content-evenly">
          <PurpleButton className={`btn ${classes.successCloseButton}`} onClick={onCloseModal}>
            Okay
          </PurpleButton>
        </div>
      </>
    ) : (
      <>
        <div className={classes.text}>
          <b>Photo file size:</b>{' '}
        </div>
        <PhotoFileSizeMenu selectedSize={selectedSize} onClick={onClickSize} />
        <div className={classes.text}>
          Your photos will be sent to the email on your user profile. (<b>{email}</b>)
        </div>

        <div className={`d-flex justify-content-between ${classes.buttonGroup}`}>
          <PurpleButton className={classes.actionButton} disabled={!canDownload || fetching} onClick={onClickDownload}>
            Download
          </PurpleButton>
          <DarkPurpleButton className={classes.actionButton} onClick={onCloseModal} disabled={fetching}>
            Cancel
          </DarkPurpleButton>
        </div>
      </>
    )}
  </Modal>
);

const PhotoDownloadModalMemo = memo(PhotoDownloadModal, areEqual);
export { PhotoDownloadModalMemo as PhotoDownloadModal };
