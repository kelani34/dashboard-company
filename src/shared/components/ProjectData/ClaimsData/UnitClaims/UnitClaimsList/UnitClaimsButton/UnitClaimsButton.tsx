import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';

import classes from './unitClaimsButton.module.css';

interface Props {
  claimType: string;
  policyNumber: string;
  claimNumber: string;
  onClaimButtonClick: (e: any) => void;
}

const UnitClaimsButton = ({ claimType, policyNumber, claimNumber, onClaimButtonClick }: Props) => (
  <Button className={classes.claimsContent} onClick={onClaimButtonClick}>
    <span className={classes.claimType}>{claimType}</span>
    <span className={classes.claimNumbers}>{policyNumber}</span>
    <span className={classes.claimNumbers}>{claimNumber}</span>
    <Icon className={classes.claimsButtonIcon} type="chevronnext" />
  </Button>
);

const UnitClaimsButtonMemo = memo(UnitClaimsButton, areEqual);

export { UnitClaimsButtonMemo as UnitClaimsButton };
