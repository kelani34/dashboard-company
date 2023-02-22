import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";
import { ProjectHeader } from "Containers/ProjectHeader";
import { ProjectContent } from "Containers/ProjectContent";

const AddLocationsContainer = () => (
  <div className="d-flex flex-column justify-content-flex-start w-100 px-3">
    <ProjectHeader singleUnitView isPartOfMultiUnitFlow />
    <ProjectContent />
  </div>
);

const AddLocationsContainerMemo = memo(AddLocationsContainer, areEqual);

export { AddLocationsContainerMemo as AddLocationsContainer };
