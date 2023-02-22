import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { UnitClaimsButton } from 'Containers/ProjectData/ClaimsData/UnitClaimsList/UnitClaimsButton';

import classes from './unitClaimsLocation.module.css';

interface Props {
  unit: any;
  unitName: string;
  claims: any[];
}

const UnitClaimsLocation = ({ unit, unitName, claims }: Props) => (
  <div>
    {claims.length > 0 && <h2 className={classes.unitName}>{unitName}</h2>}
    {claims.length > 0 && claims.map((claim) => <UnitClaimsButton key={claim.id} unit={unit} claim={claim} />)}
  </div>
);

const UnitClaimsLocationMemo = memo(UnitClaimsLocation, areEqual);

export { UnitClaimsLocationMemo as UnitClaimsLocation };
