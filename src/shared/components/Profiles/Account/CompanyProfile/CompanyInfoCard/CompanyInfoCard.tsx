import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import classes from './companyInfoCard.module.css';

interface Props {
  companyName: string;
  companyPhone: any;
  companyWebsite: string;
  companyAddress: string;
}

const CompanyInfoCard = ({ companyName, companyPhone, companyWebsite, companyAddress }: Props) => (
  <div className={classes.container}>
    <div className={classes.information}>
      <div className={classes.name}>{companyName}</div>
      <div className={classes.description}>
        Company Phone Number:
        {companyPhone ? (
          <span className={classes.details}>{companyPhone}</span>
        ) : (
          <span className={classes.noDetails}>No company phone number</span>
        )}
      </div>
      <div className={classes.description}>
        Company Website:
        {companyWebsite ? (
          <span className={classes.details}>{companyWebsite}</span>
        ) : (
          <span className={classes.noDetails}>No website added</span>
        )}
      </div>
      <div className={classes.description}>
        Company Address:
        {companyAddress ? (
          <span className={classes.details}>{companyAddress}</span>
        ) : (
          <span className={classes.noDetails}>No company address</span>
        )}
      </div>
    </div>
  </div>
);

const CompanyInfoCardMemo = memo(CompanyInfoCard, areEqual);

export { CompanyInfoCardMemo as CompanyInfoCard };
