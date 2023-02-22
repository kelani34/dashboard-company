import React, { memo, ReactNode } from "react";

import { areEqual } from "Utils/equalityChecks";

import { Modal } from "Components/Modal";

import classes from "./createProjectMain.module.css";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  modalCloseClick: (e: any) => void;
}

const CreateProjectMain = ({ children, isOpen, modalCloseClick }: Props) => (
  <Modal
    id="createProjectModal"
    classes={classes}
    title="Add New Project"
    isOpen={isOpen}
    modalHeader
    modalCloseClick={modalCloseClick}
    dataBsBackdrop="static"
    dataBsKeyboard="false"
  >
    {children}
  </Modal>
);

const CreateProjectMainMemo = memo(CreateProjectMain, areEqual);

export { CreateProjectMainMemo as CreateProjectMain };
