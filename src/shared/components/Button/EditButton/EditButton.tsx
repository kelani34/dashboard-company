import React, { memo } from 'react';
import { areEqualShallow } from 'Utils/equalityChecks';
import { PurpleButton } from '../PurpleButton';

import classes from './editButton.module.css';

interface Props {
  editable: boolean;
  onClick: (e: any) => void;
}

const EditButton = ({ editable, onClick }: Props) => (
  <div>
    <PurpleButton className={classes.button} outlined={!editable} type="button" onClick={onClick}>
      {editable ? 'Done' : 'Edit'}
    </PurpleButton>
  </div>
);

const EditButtonMemo = memo(EditButton, areEqualShallow);

// Export it with the correct name
export { EditButtonMemo as EditButton };
