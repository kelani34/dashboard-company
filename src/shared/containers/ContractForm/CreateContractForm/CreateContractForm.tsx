import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Modal } from 'Components/Modal';

import classes from './createContractForm.module.css';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  modalCloseClick: (e: any) => void;
}

const CreateContractForm = ({ children, isOpen, modalCloseClick }: Props) => (
  <Modal
    titleIcon
    leftHeaderIcon="forms"
    id="createContractFormModal"
    classes={classes}
    title="Add Contract Form"
    isOpen={isOpen}
    modalHeader
    modalCloseClick={modalCloseClick}
    dataBsBackdrop="static"
    dataBsKeyboard="false"
  >
    {children}
  </Modal>
);

const CreateContractFormMemo = memo(CreateContractForm, areEqual);

export { CreateContractFormMemo as CreateContractForm };
