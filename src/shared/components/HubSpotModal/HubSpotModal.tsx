import React, { memo } from 'react';

import { Modal } from 'Components/Modal';

import { areEqual } from 'Utils/equalityChecks';
import { Button, PurpleButton } from 'Components/Button';

import { InviteEmployees } from 'Containers/InviteEmployees';
import classes from './hubSpotModal.module.css';

interface Props {
  isOpen: boolean;
  modalCloseClick: (e: any) => void;
  chooseBook: (e: any) => void;
  chooseSkip: (e: any) => void;
  closeAll: (e: any) => void;
  chosenAction: any;
}

const HubSpotModal = ({ isOpen, modalCloseClick, chooseSkip, chooseBook, chosenAction, closeAll }: Props) => (
  <Modal title="Book A Call" classes={classes} isOpen={isOpen} modalHeader modalCloseClick={modalCloseClick}>
    <h2 className={classes.importantText}>
      Our Customers Get The Most Out Of Company By Booking a Discovery Call Before Beginning
    </h2>
    <div
      style={{ display: chosenAction === 1 ? 'block' : 'none' }}
      className="meetings-iframe-container"
      data-src="https://meetings.hubspot.com/justin-sutherland/product-tour-?embed=true"
    />
    {!chosenAction && (
      <PurpleButton className={classes.button} onClick={chooseBook}>
        Book Discovery Call
      </PurpleButton>
    )}
    {!chosenAction && (
      <Button className={classes.button} onClick={chooseSkip}>
        Skip
      </Button>
    )}
    <InviteEmployees
      header={
        <div>
          <h3 className={classes.importantText} style={{ paddingBottom: 0, marginTop: '0.5rem' }}>
            It’s Easy To Get Your Team Started
          </h3>
          <div className={classes.text}>Copy and send them the link or invite by email</div>
        </div>
      }
      footer={
        <div>
          <PurpleButton className={classes.button} onClick={closeAll}>
            Done
          </PurpleButton>
        </div>
      }
      isOpen={chosenAction === 0}
      modalCloseClick={closeAll}
    />
  </Modal>
);

const HubSpotModalMemo = memo(HubSpotModal, areEqual);

export { HubSpotModalMemo as HubSpotModal };
