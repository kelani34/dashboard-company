import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";
import { ProjectHeader } from "Containers/ProjectHeader";
import { ProjectContent } from "Containers/ProjectContent";
import { PhotoFilter } from "Containers/PhotoFilter";

const SingleUnitAddContainer = () => (
  <div className="d-flex flex-column justify-content-flex-start w-100 px-3">
    <div className="d-flex w-100 justify-content-center">
      <PhotoFilter />
    </div>
    <ProjectHeader singleUnitView isPartOfMultiUnitFlow={false} />
    <ProjectContent />
  </div>
);

const SingleUnitAddContainerMemo = memo(SingleUnitAddContainer, areEqual);

export { SingleUnitAddContainerMemo as SingleUnitAdd };
