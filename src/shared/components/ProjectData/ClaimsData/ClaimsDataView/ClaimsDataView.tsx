import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './claimsDataView.module.css';

interface Props {
  policyHolder: string;
  representative: string;
  provider: string;
  policyNumber: string;
  claimNumber: string;
}

const ClaimsDataView = ({ policyHolder, representative, provider, policyNumber, claimNumber }: Props) => (
  <div className="d-flex flex-column w-100">
    <div className={classes.description}>
      Policy Holder:
      {policyHolder ? (
        <span className={classes.details}>{policyHolder}</span>
      ) : (
        <span className={classes.noDetails}>No Policy Holder</span>
      )}
    </div>
    <div className={classes.description}>
      Representative:
      {representative ? (
        <span className={classes.details}>{representative}</span>
      ) : (
        <span className={classes.noDetails}>No Representative</span>
      )}
    </div>
    <div className={classes.description}>
      Provider:
      {provider ? (
        <span className={classes.details}>{provider}</span>
      ) : (
        <span className={classes.noDetails}>No Provider</span>
      )}
    </div>
    <div className={classes.description}>
      Policy number:
      {policyNumber ? (
        <span className={classes.details}>{policyNumber}</span>
      ) : (
        <span className={classes.noDetails}>No Policy Number</span>
      )}
    </div>
    <div className={classes.description}>
      Claim Number:
      {claimNumber ? (
        <span className={classes.details}>{claimNumber}</span>
      ) : (
        <span className={classes.noDetails}>No Claim Number</span>
      )}
    </div>
  </div>
);

const ClaimsDataViewMemo = memo(ClaimsDataView, areEqual);

export { ClaimsDataViewMemo as ClaimsDataView };
