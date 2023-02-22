import React, { memo } from 'react';

import { Modal } from 'Components/Modal';
import { Icon } from 'Components/Icons';

import { areEqual } from 'Utils/equalityChecks';
import { Button } from 'Components/Button';

import classes from './mobileWarningModal.module.css';

interface Props {
  isOpen: boolean;
  modalCloseClick: (e: any) => void;
}

const MobileWarningModal = ({ isOpen, modalCloseClick }: Props) => (
  <Modal title="" classes={classes} isOpen={isOpen} modalHeader modalCloseClick={modalCloseClick}>
    <h2 className={classes.importantText}>We have an app!</h2>
    <Icon type="mobileapp" />
    <div className={classes.text}>Try the Company iOS App with the link below</div>
    <a className={classes.appstoreLink} href="">
      <img className={classes.image} alt="App store link" src="" />
    </a>
    <div className={classes.text}>
      Our Company WebApp isn’t optimized for mobile devices yet. We recommend using the iOS App for the best experience.
    </div>
    <Button className={classes.button} onClick={modalCloseClick}>
      Continue Anyways
    </Button>
  </Modal>
);

const MobileWarningModalMemo = memo(MobileWarningModal, areEqual);

export { MobileWarningModalMemo as MobileWarningModal };
