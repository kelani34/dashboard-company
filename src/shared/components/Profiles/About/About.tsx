import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';
import { NewTabAnchor } from 'Components/Anchor/NewTabAnchor';

import classes from './about.module.css';

const About = () => (
  <div className={classes.container}>
    <div className={classes.header}>
      <Icon className={classes.logo} type="logo" />
      <span className={classes.version}>Version 1.0.0</span>
    </div>
    <p className={classes.description}>
      Company is a project management software for property restoration contractors who are plagued with paperwork.
    </p>
    <NewTabAnchor href="https://company.com" className={classes.rocketLink}>
      company.com
    </NewTabAnchor>
    <div className={classes.termsLinkBox}>
      <NewTabAnchor href="https://company.com/terms-and-conditions/">
        <p className={classes.terms}>Terms and Conditions</p>
      </NewTabAnchor>
      <NewTabAnchor href="https://company.com/terms-and-conditions/">
        <Icon className={classes.termsLinkIcon} type="linkopen" />
      </NewTabAnchor>
    </div>
    <div className={classes.policyLinkBox}>
      <NewTabAnchor href="https://company.com/privacy-policy/">
        <p className={classes.policy}>Privacy Policy</p>
      </NewTabAnchor>
      <NewTabAnchor href="https://company.com/privacy-policy/">
        <Icon className={classes.policyLinkIcon} type="linkopen" />
      </NewTabAnchor>
    </div>
    <p className={classes.copyright}>© 2020 Company</p>
  </div>
);

const AboutMemo = memo(About, areEqual);

export { AboutMemo as About };
