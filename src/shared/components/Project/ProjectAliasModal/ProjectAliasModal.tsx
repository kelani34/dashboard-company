import React, { memo } from 'react';

import { Modal } from 'Components/Modal';

import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button';
import { TextBox } from 'Components/TextBox';

import classes from './projectAliasModal.module.css';

interface Props {
  isOpen: boolean;
  alias: string;
  invalid?: boolean;
  onChangeAlias: (e: any) => void;
  onCloseClick: (e: any) => void;
  onSaveClick: (e: any) => void;
}
const ProjectAliasModal = ({ isOpen, alias, invalid, onChangeAlias, onCloseClick, onSaveClick }: Props) => (
  <Modal
    id="project-alias-modal"
    classes={classes}
    title="Add or Edit Project Alias"
    isOpen={isOpen}
    modalHeader
    closeButtonText="Cancel"
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={onCloseClick}
  >
    <TextBox
      name="alias"
      type="text"
      ariaLabel="Add or edit project alias"
      className={`${classes.validateField} ${invalid ? classes.invalidField : classes.validField}`}
      value={alias}
      onChange={onChangeAlias}
    />

    <div className={classes.buttonRow}>
      <PurpleButton className={`${classes.button} ${classes.save}`} onClick={onSaveClick}>
        Save
      </PurpleButton>
      <PurpleButton className={`${classes.button} ${classes.cancel}`} onClick={onCloseClick}>
        Cancel
      </PurpleButton>
    </div>
  </Modal>
);

ProjectAliasModal.defaultProps = {
  invalid: false,
};

const ProjectAliasModalMemo = memo(ProjectAliasModal, areEqual);

export { ProjectAliasModalMemo as ProjectAliasModal };
