import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Modal } from 'Components/Modal';

import classes from './equipmentLogInfoModal.module.css';

interface Props {
  isOpen: boolean;
  onCloseClick: (e: any) => void;
}

const EquipmentLogInfoModal = ({ isOpen, onCloseClick }: Props) => (
  <Modal
    id="equipment-log-info-modal"
    classes={classes}
    title="Want to Edit your Logs?"
    isOpen={isOpen}
    modalHeader
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={onCloseClick}
  >
    <div className={classes.text}>To change information, go to the company app.</div>
  </Modal>
);

const EquipmentLogInfoModalMemo = memo(EquipmentLogInfoModal, areEqual);

export { EquipmentLogInfoModalMemo as EquipmentLogInfoModal };
