import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { ClaimsDataEdit, ClaimsDataView } from 'Containers/ProjectData';
import { Header } from '../Header';
import { UnitClaims } from './UnitClaims';
import classes from './claimsData.module.css';

interface Props {
  projectAddress: string;
  editIsOpen: boolean;
  onEditButtonClick: (e: any) => void;
}

const ClaimsData = ({ projectAddress, editIsOpen, onEditButtonClick }: Props) => (
  <div className={`${classes.claimsDataBase}`}>
    <div className="d-flex flex-column w-100">
      <Header title="Claims" onEditButtonClick={onEditButtonClick} />
      <div className="d-flex flex-row justify-content-between align-items-center w-100">
        <p className={classes.information}>Project Claim Information</p>
        <span className={classes.addInfo}>Add Claim Information for the project</span>
      </div>
      <div className={classes.projectAddress}>{projectAddress}</div>
      <div className={classes.claimsView}>{editIsOpen ? <ClaimsDataEdit /> : <ClaimsDataView />}</div>
      <UnitClaims />
    </div>
  </div>
);

const ClaimsDataMemo = memo(ClaimsData, areEqual);

export { ClaimsDataMemo as ClaimsData };
