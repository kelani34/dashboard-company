import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Modal } from 'Components/Modal';
import { PurpleButton } from 'Components/Button';

import classes from './downloadReportModal.module.css';

interface Props {
  loading: boolean;
  isOpen: boolean;
  reportName: string;
  onDownloadButtonClick: (e: any) => void;
  modalCloseClick: (e: any) => void;
}

const DownloadReportModal = ({ loading, isOpen, reportName, onDownloadButtonClick, modalCloseClick }: Props) => (
  <Modal
    title={`Download ${reportName}?`}
    isOpen={isOpen}
    classes={classes}
    modalHeader
    modalCloseClick={modalCloseClick}
  >
    <p>Download a copy to your local files</p>
    <PurpleButton onClick={onDownloadButtonClick} className={classes.downloadButton} disabled={loading}>
      Download
    </PurpleButton>
  </Modal>
);

const DownloadReportModalMemo = memo(DownloadReportModal, areEqual);

export { DownloadReportModalMemo as DownloadReportModal };
