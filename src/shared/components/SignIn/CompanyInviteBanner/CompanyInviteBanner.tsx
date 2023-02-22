import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { AvatarOrInitials } from 'Components/Avatar';
import classes from './companyInviteBanner.module.css';

interface Props {
  companyName: string;
  companyLogo?: string;
}

const CompanyInviteBanner = ({ companyName, companyLogo }: Props) => (
  <div className={classes.banner}>
    <div className={classes.bannerText}>
      <AvatarOrInitials
        avatarClassName={companyLogo ? classes.avatar : classes.initials}
        avatar={companyLogo}
        firstName={companyName}
        lastName={null}
      />
      {`${companyName} invited you to join them on company`}
    </div>
  </div>
);

CompanyInviteBanner.defaultProps = {
  companyLogo: undefined,
};

const CompanyInviteBannerMemo = memo(CompanyInviteBanner, areEqual);
export { CompanyInviteBannerMemo as CompanyInviteBanner };
