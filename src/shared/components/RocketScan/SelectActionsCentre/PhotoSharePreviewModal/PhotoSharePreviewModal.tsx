import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';

import { Modal } from 'Components/Modal';
import { SelectedPhotos, PhotoShareLink } from 'Containers/RocketScan';
import { DarkPurpleButton } from 'Components/Button';
import { Icon } from 'Components/Icons';
import { PhotoShareToast } from './PhotoShareToast';

import classes from './photoSharePreviewModal.module.css';

interface Props {
  isOpen?: boolean;
  linkGenerated: boolean;
  photosCount: number;
  showToast: boolean;
  toastMessage: string;
  setToastMessage: any;
  setShowToast: any;
  onClickClosePhotoShare: (e: any) => void;
  onClickGenerateLinkButton: (e: any) => void;
  onPreviousIconClick: (e: any) => void;
}

const PhotoSharePreviewModal = ({
  isOpen = false,
  linkGenerated,
  photosCount,
  showToast,
  toastMessage,
  setToastMessage,
  setShowToast,
  onClickClosePhotoShare,
  onClickGenerateLinkButton,
  onPreviousIconClick,
}: Props) => (
  <Modal
    id="photoSharePreviewModal"
    classes={classes}
    title="Options Menu"
    isOpen={isOpen}
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    leftHeaderIcon={linkGenerated ? 'chevronprevious' : ''}
    modalHeader
    onLeftHeaderIconClick={onPreviousIconClick}
    modalCloseClick={onClickClosePhotoShare}
    toast={<PhotoShareToast showToast={showToast} message={toastMessage} />}
  >
    <div>
      <div className={classes.selectedAmount}>{`${photosCount} Photos Selected`}</div>
      {!linkGenerated ? (
        <div>
          <div className={classes.selectedPhotos}>
            <SelectedPhotos />
          </div>
          <DarkPurpleButton className={classes.generateLinkButton} onClick={onClickGenerateLinkButton}>
            <div className={classes.buttonContent}>
              <Icon type="link" />
              <span className={classes.buttonText}>Generate Link to Share Photos</span>
            </div>
            <Icon className={classes.chevron} type="chevronnext" />
          </DarkPurpleButton>
        </div>
      ) : (
        <div>
          <PhotoShareLink toastMessage={setToastMessage} showToast={setShowToast} />
        </div>
      )}
    </div>
  </Modal>
);

PhotoSharePreviewModal.defaultProps = {
  isOpen: false,
};

// This to allows default props
const PhotoSharePreviewModalMemo = memo(PhotoSharePreviewModal, areEqualShallow);

export { PhotoSharePreviewModalMemo as PhotoSharePreviewModal };
