import React, { memo } from 'react';

import { Modal } from 'Components/Modal';

import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button';
import { TextBox } from 'Components/TextBox';

import classes from './deleteRoomModal.module.css';

interface Props {
  isOpen: boolean;
  confirmationString: string;
  invalid?: boolean;
  currentRoomInfo?: any;
  onChangeConfirmationString: (e: any) => void;
  onCloseClick: (e: any) => void;
  onDeleteClick: (e: any) => void;
}
const DeleteRoomModal = ({
  isOpen,
  confirmationString,
  invalid,
  currentRoomInfo,
  onChangeConfirmationString,
  onCloseClick,
  onDeleteClick,
}: Props) => (
  <Modal
    id="project-deleteroom-modal"
    classes={classes}
    title="Delete Room"
    isOpen={isOpen}
    modalHeader
    closeButtonText="Cancel"
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={onCloseClick}
  >
    <div className={classes.text}>
      <div>Warning!</div>
      {currentRoomInfo && (
        <>
          <br />
          <div>
            Are you sure you want to delete
            <b> {currentRoomInfo.roomName}</b> on
            <b> {currentRoomInfo.levelName}</b>?
          </div>
        </>
      )}

      <br />
      <div>
        Deleting the room will remove all data recorded, including photos. Type the word 'delete' (all lowercase) in the
        box below if you want to proceed.
      </div>

      <br />
    </div>
    <TextBox
      name="delete-confirmation"
      type="text"
      ariaLabel=""
      className={`${classes.validateField} ${invalid ? classes.invalidField : classes.validField}`}
      value={confirmationString}
      onChange={onChangeConfirmationString}
    />

    <div className={classes.buttonRow}>
      <PurpleButton
        className={`${classes.button} ${classes.delete}`}
        onClick={onDeleteClick}
        disabled={confirmationString !== 'delete'}
      >
        Yes, Delete the Room
      </PurpleButton>
      <PurpleButton className={`${classes.button} ${classes.cancel}`} onClick={onCloseClick}>
        No, Cancel
      </PurpleButton>
    </div>
  </Modal>
);

DeleteRoomModal.defaultProps = {
  invalid: false,
  currentRoomInfo: undefined,
};

const DeleteRoomModalMemo = memo(DeleteRoomModal, areEqual);

export { DeleteRoomModalMemo as DeleteRoomModal };
