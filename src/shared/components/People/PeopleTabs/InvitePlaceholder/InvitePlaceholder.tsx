import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';

import { PurpleButton } from 'Components/Button';

import classes from './invitePlaceHolder.module.css';

interface Props {
  tab: string;
  onClickPlaceholderButton: (e: any) => void;
}

const InvitePlaceholder = ({ tab, onClickPlaceholderButton }: Props) => (
  <div className={`d-flex align-items-center justify-content-center ${classes.placeHolderWrapper}`}>
    <div className={`d-flex flex-column align-items-center justify-content-center ${classes.placeHolderContainer}`}>
      <div className={classes.peopleIcon}>
        <Icon type="peoplepink" />
      </div>
      {tab === 'employees' ? (
        <div className={classes.text}>You haven't invited any employees yet</div>
      ) : (
        <div className={classes.text}>You haven't added any contacts yet</div>
      )}

      <PurpleButton className={classes.buttonInvite} onClick={onClickPlaceholderButton}>
        {tab === 'employees' ? 'Invite +' : 'Add Contact +'}
      </PurpleButton>
    </div>
  </div>
);

const InvitePlaceholderMemo = memo(InvitePlaceholder, areEqual);
export { InvitePlaceholderMemo as InvitePlaceholder };
