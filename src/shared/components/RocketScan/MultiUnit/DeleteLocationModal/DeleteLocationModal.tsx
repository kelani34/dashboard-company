import React, { memo } from 'react';

import { Modal } from 'Components/Modal';

import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button';
import { TextBox } from 'Components/TextBox';

import classes from './deleteLocationModal.module.css';

interface Props {
  isOpen: boolean;
  confirmationString: string;
  invalid?: boolean;
  currentLocationInfo?: any;
  onChangeConfirmationString: (e: any) => void;
  onCloseClick: (e: any) => void;
  onDeleteClick: (e: any) => void;
}
const DeleteLocationModal = ({
  isOpen,
  confirmationString,
  invalid,
  currentLocationInfo,
  onChangeConfirmationString,
  onCloseClick,
  onDeleteClick,
}: Props) => (
  <Modal
    id="project-deletelocation-modal"
    classes={classes}
    title="Delete Location"
    isOpen={isOpen}
    modalHeader
    closeButtonText="Cancel"
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={onCloseClick}
  >
    <div className={classes.text}>
      Warning!
      <br />
      {currentLocationInfo && (
        <div>
          Are you sure you want to delete
          <b> {currentLocationInfo.locationName}</b> on
          <b> floor {currentLocationInfo.floorNumber}</b>?
        </div>
      )}
      <br />
      <div>
        Deleting this location will remove
        <b> all</b> data recorded in it,
        <b> including rooms, photos and damage types</b>.
      </div>
      {currentLocationInfo.roomsCount !== 0 && currentLocationInfo.photosCount !== 0 && (
        <>
          <div>
            This includes {currentLocationInfo.photosCount} photo
            {currentLocationInfo.photosCount > 1 && 's'} in
            {currentLocationInfo.roomsCount} room
            {currentLocationInfo.roomsCount > 1 && 's'}.
          </div>
        </>
      )}
      <br />
      <div>Type the word 'delete' (all lowercase) in the box below if you want to proceed.</div>
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
        Yes, Delete Location
      </PurpleButton>
      <PurpleButton className={`${classes.button} ${classes.cancel}`} onClick={onCloseClick}>
        No, Cancel
      </PurpleButton>
    </div>
  </Modal>
);

DeleteLocationModal.defaultProps = {
  invalid: false,
  currentLocationInfo: undefined,
};

const DeleteLocationModalMemo = memo(DeleteLocationModal, areEqual);

export { DeleteLocationModalMemo as DeleteLocationModal };
