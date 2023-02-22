import React, { memo } from 'react';

import { RocketEmblemSvg } from 'Components/Icons/RocketEmblem';
import { areEqual } from 'Utils/equalityChecks';
import { Anchor } from 'Components/Anchor';
import { PurpleButton } from 'Components/Button';

import classes from './projectUnavailable.module.css';

const ProjectUnavailable = () => (
  <div className={classes.container}>
    <RocketEmblemSvg className={classes.logo} />
    <div className={classes.text}>
      The requested project is unavailable. It may not exist or is from other companies.
    </div>
    <Anchor href="/projects" className={classes.link}>
      <PurpleButton>Go back to projects</PurpleButton>
    </Anchor>
  </div>
);

const ProjectUnavailableMemo = memo(ProjectUnavailable, areEqual);

export { ProjectUnavailableMemo as ProjectUnavailable };
