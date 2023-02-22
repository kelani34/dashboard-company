import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { DarkPurpleButton } from 'Components/Button';
import { Icon } from 'Components/Icons';
import { UnitClaimsLocation } from 'Containers/ProjectData';

import classes from './unitClaimsList.module.css';

interface Props {
  units: any[];
  onAddUnitButtonClick: (e: any) => void;
}

const UnitClaimsList = ({ units, onAddUnitButtonClick }: Props) => (
  <div>
    {units?.length > 0 ? (
      units.map((unit: any) => <UnitClaimsLocation key={unit.id} unit={unit} />)
    ) : (
      <div className={classes.noUnitClaimsContainer}>
        <p className={classes.noClaims}>No Unit Claims in Project</p>
        <p className={classes.noContent}>Add Content and Betterment Claims here</p>
        <Icon type="rocketemblemsmall" />
      </div>
    )}
    <DarkPurpleButton className={classes.addButton} onClick={onAddUnitButtonClick}>
      Add a unit claim
    </DarkPurpleButton>
  </div>
);

const UnitClaimsListMemo = memo(UnitClaimsList, areEqual);

export { UnitClaimsListMemo as UnitClaimsList };
