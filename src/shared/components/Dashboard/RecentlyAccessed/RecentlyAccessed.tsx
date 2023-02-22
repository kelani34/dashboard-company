import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";

import { Anchor } from "Components/Anchor";
import { CreateProjectButton } from "Containers/Dashboard";

import classes from "./recentlyAccessed.module.css";

const RecentlyAccessed = () => (
  <div className={`card ${classes.cardBase}`}>
    <div className="d-flex flex-row justify-content-between align-items-center">
      <h6 className={`mb-0 ${classes.title}`}>Recently Accessed</h6>
      <Anchor href="#" className={classes.anchor}>
        View All
      </Anchor>
    </div>
    <p className={classes.p}>No projects yet. Create a new project.</p>
    <CreateProjectButton className={classes.createProjectButton} />
  </div>
);

const RecentlyAccessedMemo = memo(RecentlyAccessed, areEqual);

export { RecentlyAccessedMemo as RecentlyAccessed };
