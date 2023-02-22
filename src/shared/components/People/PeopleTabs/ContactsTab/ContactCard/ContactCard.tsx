import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { EmailAnchor } from 'Components/Anchor/EmailAnchor';
import { PhoneAnchor } from 'Components/Anchor/PhoneAnchor';

import classes from './contactCard.module.css';

interface Props {
  id: string;
  recentlyAdded?: string;
  companyName: string;
  fullName?: string;
  email?: string;
  phone?: string;
  extension?: string;
  isCompany: boolean;
  selectCardClick: (e: any) => void;
}

const ContactCard = ({
  id,
  recentlyAdded,
  companyName,
  fullName,
  email,
  phone,
  extension,
  isCompany,
  selectCardClick,
}: Props) => (
  <div
    className={`${classes.container} ${recentlyAdded === id ? classes.highlight : ''}`}
    id={id}
    role="button"
    tabIndex={0}
    onKeyUp={selectCardClick}
    onClick={selectCardClick}
  >
    <div className="d-flex align-items-start">
      <div className={classes.names}>
        <div className={classes.primaryName}>{isCompany ? companyName : fullName}</div>
        <div className={classes.secondaryName}>{isCompany ? fullName : companyName}</div>
      </div>
    </div>
    {(email || phone) && (
      <div className={classes.body}>
        {email && (
          <div className={classes.email}>
            <EmailAnchor address={email}>{email}</EmailAnchor>
          </div>
        )}
        {phone && (
          <div className={classes.phone}>
            <PhoneAnchor phone={phone}>
              {phone} {extension?.length > 0 && <span>{`\u2022 Ext ${extension}`}</span>}
            </PhoneAnchor>
          </div>
        )}
      </div>
    )}
  </div>
);
ContactCard.defaultProps = {
  recentlyAdded: undefined,
  fullName: undefined,
  email: undefined,
  phone: undefined,
  extension: undefined,
};
const ContactCardMemo = memo(ContactCard, areEqual);
export { ContactCardMemo as ContactCard };
