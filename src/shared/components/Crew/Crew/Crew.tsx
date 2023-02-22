import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button';
import { ProjectDataHeader } from 'Containers/ProjectData';

import classes from './crew.module.css';

interface Props {
  children?: ReactNode;
  hasCrew: boolean;
  currentUserName: any;
  currentUserAvatar: any;
  onClickAddCrew: (e: any) => void;
}

const Crew = ({ children, hasCrew, currentUserName, currentUserAvatar, onClickAddCrew }: Props) => (
  <div className={classes.crewContent}>
    <div className="d-flex justify-content-start align-items-center">
      <ProjectDataHeader />
      {hasCrew && (
        <PurpleButton className={classes.addCrewButton} onClick={onClickAddCrew}>
          Add Crew
        </PurpleButton>
      )}
    </div>

    <div className={`d-flex justify-content-start align-items-center ${classes.currentUser}`}>
      {currentUserAvatar}
      <div className={classes.userNameArea}>
        <div className={classes.userName}>{currentUserName}</div>
        <span>(You)</span>
      </div>
    </div>
    <div className="position-relative">{children}</div>
  </div>
);
Crew.defaultProps = {
  children: undefined,
};

const CrewMemo = memo(Crew, areEqual);

export { CrewMemo as Crew };
