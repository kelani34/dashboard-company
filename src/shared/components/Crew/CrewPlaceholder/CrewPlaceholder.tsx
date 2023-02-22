import React, { memo } from 'react';
import { Icon } from 'Components/Icons';

import { PurpleButton } from 'Components/Button';
import { areEqual } from 'Utils/equalityChecks';
import classes from './crewPlaceholder.module.css';

interface Props {
  onClickAddCrew: () => void;
}

const CrewPlaceholder = ({ onClickAddCrew }: Props) => (
  <div className="d-flex flex-column justify-content-center align-items-center">
    <div className={classes.content}>
      <Icon type="peoplepink" />
      <div className={classes.heading}>You haven’t added any team members yet</div>
      <div className={classes.copy}>Click the ‘Add Crew Member’ button to create your best team!</div>
      <PurpleButton type="button" onClick={onClickAddCrew}>
        Add Crew
      </PurpleButton>
    </div>
  </div>
);

const CrewPlaceholderMemo = memo(CrewPlaceholder, areEqual);

export { CrewPlaceholderMemo as CrewPlaceholder };
