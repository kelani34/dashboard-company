import React, { KeyboardEvent, memo, MouseEvent } from 'react';
import { areEqualShallow } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { Modal } from 'Components/Modal';
import { Anchor } from 'Components/Anchor';
import { Button } from '../Button';

import classes from './projectScreenButton.module.css';

interface Props {
  type?: 'button';
  id?: string;
  isModalOpen: boolean;
  onClick?: (e: MouseEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLElement>) => void;
  setModalStatus: () => void;
}

const ProjectScreenButton = ({ type, id, isModalOpen, onClick, onKeyUp, setModalStatus }: Props) => (
  <>
    <Modal
      title="Project Screen"
      isOpen={isModalOpen}
      setIsOpen={setModalStatus}
      useCircleCloseButton
      classes={{
        modal: classes.modalOverride,
        modalContent: classes.modalContentOverride,
        modalDialog: classes.modalDialogOverride,
      }}
    >
      <ul>
        <li className={`list-group-item ${classes.modalLinkOverride} d-flex align-items-end justify-content-end }`}>
          <Anchor href="/" className={`${classes.linkText}`}>
            Add a Contact
            <Button className={`rounded-circle ${classes.iconContainer}`}>
              <Icon type="person" className={`${classes.listIcon}`} />
            </Button>
          </Anchor>
        </li>
        <li className={`list-group-item ${classes.modalLinkOverride} d-flex align-items-end justify-content-end }`}>
          {/* <Anchor href="/" className={`${classes.linkText}`}>
            Create Project
            <Button className={`rounded-circle ${classes.iconContainer}`}>
              <Icon type="projects" className={`${classes.listIcon}`} />
            </Button>
          </Anchor> */}
        </li>
      </ul>
    </Modal>

    {!isModalOpen && (
      <Button
        id={id}
        type={type}
        onClick={onClick}
        onKeyUp={onKeyUp}
        disabled={false}
        className={`${classes.btnBase} ${classes.plusButton} rounded-circle d-block d-sm-none`}
      >
        <Icon type="plus" className={`${classes.btnIcon}`} />
      </Button>
    )}
  </>
);

ProjectScreenButton.defaultProps = {
  onClick: undefined,
  onKeyUp: undefined,
  id: undefined,
  type: 'button',
};

const ProjectScreenButtonMemo = memo(ProjectScreenButton, areEqualShallow);
export { ProjectScreenButtonMemo as ProjectScreenButton };
