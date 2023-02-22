import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Modal } from 'Components/Modal';
import { DarkPurpleButton, DeleteButton } from 'Components/Button';

import classes from './deleteUnitClaimModal.module.css';

interface Props {
  isOpen: boolean;
  unitName: string;
  claimType: string;
  onClickCloseModal: (e: any) => void;
  onCancelButtonClick: (e: any) => void;
  onDeleteButtonClick: (e: any) => void;
}

const DeleteUnitClaimModal = ({
  isOpen,
  unitName,
  claimType,
  onClickCloseModal,
  onCancelButtonClick,
  onDeleteButtonClick,
}: Props) => (
  <Modal
    id="deleteUnitClaimModal"
    classes={classes}
    title="Delete Unit Claim"
    isOpen={isOpen}
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalHeader
    modalCloseClick={onClickCloseModal}
  >
    <div className={classes.message}>
      Are you sure you want to delete the
      <span className={classes.unitClaim}>
        {' '}
        {claimType} {unitName}{' '}
      </span>
      from your project?
    </div>
    <div className={classes.buttons}>
      <DarkPurpleButton className={classes.cancelButton} onClick={onCancelButtonClick}>
        Cancel
      </DarkPurpleButton>
      <DeleteButton className={classes.deleteButton} onClick={onDeleteButtonClick}>
        Yes, Delete Claim
      </DeleteButton>
    </div>
  </Modal>
);

const DeleteUnitClaimModalMemo = memo(DeleteUnitClaimModal, areEqual);

export { DeleteUnitClaimModalMemo as DeleteUnitClaimModal };
