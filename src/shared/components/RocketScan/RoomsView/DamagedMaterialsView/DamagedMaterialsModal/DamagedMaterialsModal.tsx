import React, { memo } from 'react';

import { Modal } from 'Components/Modal';

import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button';
import { DamagedMaterialList } from 'Containers/RocketScan';

import classes from './damagedMaterialsModal.module.css';

interface Props {
  isOpen: boolean;
  onSaveClick: (e: any) => void;
  onCancelClick: (e: any) => void;
}

const DamagedMaterialsModal = ({ isOpen, onSaveClick, onCancelClick }: Props) => (
  <Modal
    id="damaged-materials-modal"
    classes={classes}
    title="Damage Materials"
    isOpen={isOpen}
    modalHeader
    closeButtonText="Cancel"
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={onCancelClick}
  >
    <DamagedMaterialList />
    <div className={classes.buttonRow}>
      <PurpleButton className={`${classes.button} ${classes.save}`} onClick={onSaveClick}>
        Save
      </PurpleButton>
      <PurpleButton className={`${classes.button} ${classes.cancel}`} onClick={onCancelClick}>
        Cancel
      </PurpleButton>
    </div>
  </Modal>
);

const DamagedMaterialsModalMemo = memo(DamagedMaterialsModal, areEqual);

export { DamagedMaterialsModalMemo as DamagedMaterialsModal };
