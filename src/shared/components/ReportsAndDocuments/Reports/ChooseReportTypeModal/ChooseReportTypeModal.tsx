import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { PurpleButton } from 'Components/Button';
import { Modal } from 'Components/Modal';

import classes from './chooseReportTypeModal.module.css';

interface Props {
  isOpen: boolean;
  modalCloseClick: (e: any) => void;
  onPhotoReportClick: (e: any) => void;
  onDryingReportClick: (e: any) => void;
}
const ChooseReportTypeModal = ({ isOpen, modalCloseClick, onPhotoReportClick, onDryingReportClick }: Props) => (
  <Modal
    id="affected-location-modal"
    classes={classes}
    title="Drying or Photo Report?"
    isOpen={isOpen}
    modalHeader
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={modalCloseClick}
  >
    <div className={classes.text}>Please select which report type you want to generate:</div>
    <div className={classes.buttonWrapper}>
      <PurpleButton className={classes.reportTypeButton} onClick={onPhotoReportClick}>
        Photo Report
      </PurpleButton>
      <PurpleButton className={classes.reportTypeButton} onClick={onDryingReportClick}>
        Drying Report
      </PurpleButton>
    </div>
  </Modal>
);

const ChooseReportTypeModalMemo = memo(ChooseReportTypeModal, areEqual);

export { ChooseReportTypeModalMemo as ChooseReportTypeModal };
