import React, { memo } from 'react';

import { Modal } from 'Components/Modal';

import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button';
import { TextBox } from 'Components/TextBox';

import classes from './deleteProjectModal.module.css';

interface Props {
  isOpen: boolean;
  confirmationString: string;
  invalid?: boolean;
  currentProjectInfo?: any;
  onChangeConfirmationString: (e: any) => void;
  onCloseClick: (e: any) => void;
  onDeleteClick: (e: any) => void;
}
const DeleteProjectModal = ({
  isOpen,
  confirmationString,
  invalid,
  currentProjectInfo,
  onChangeConfirmationString,
  onCloseClick,
  onDeleteClick,
}: Props) => (
  <Modal
    id="project-deletelocation-modal"
    classes={classes}
    title="Delete Project"
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
      {currentProjectInfo && <div>Are you sure you want to delete the project at {currentProjectInfo.address}?</div>}
      <br />
      <div>
        Deleting this project will remove
        <b> all</b> data recorded in it, including
        <b> notes, photos, project and loss info, moisture and atmospheric readings, equipment logs and reports</b>.
      </div>
      <div>This is irreversible.</div>
      <br />
      <div>Type the word 'delete project' (all lowercase) in the box below if you want to proceed.</div>
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
        disabled={confirmationString !== 'delete project'}
      >
        Yes, Delete Project
      </PurpleButton>
      <PurpleButton className={`${classes.button} ${classes.cancel}`} onClick={onCloseClick}>
        No, Cancel
      </PurpleButton>
    </div>
  </Modal>
);

DeleteProjectModal.defaultProps = {
  invalid: false,
  currentProjectInfo: undefined,
};

const DeleteProjectModalMemo = memo(DeleteProjectModal, areEqual);

export { DeleteProjectModalMemo as DeleteProjectModal };
