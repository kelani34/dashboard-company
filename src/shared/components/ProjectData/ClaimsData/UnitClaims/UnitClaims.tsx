import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { UnitClaimsList } from 'Containers/ProjectData/ClaimsData';

import classes from './unitClaims.module.css';

const UnitClaims = () => (
  <div className="d-flex flex-column w-100">
    <div className={`${classes.headerContainer} d-flex flex-row justify-content-between align-items-center w-100`}>
      <p className={classes.header}>Unit Claims</p>
      <span className={classes.headerInfo}>Add Content and Betterment Claims</span>
    </div>
    <UnitClaimsList />
  </div>
);

const UnitClaimsMemo = memo(UnitClaims, areEqual);

export { UnitClaimsMemo as UnitClaims };
