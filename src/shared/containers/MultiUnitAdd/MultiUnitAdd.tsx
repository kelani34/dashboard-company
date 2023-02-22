import React, { memo } from "react";

import { ProjectHeader } from "Containers/ProjectHeader";
import { MultiUnitContent } from "Containers/ProjectContent/MultiUnitContent";
import { areEqual } from "Utils/equalityChecks";
import classes from "./multiUnitAdd.module.css";

const MultiUnitAddContainer = () => (
  <div className={`d-flex flex-column justify-content-flex-start w-100 ${classes.containerWrapper}`}>
    <ProjectHeader singleUnitView={false} isPartOfMultiUnitFlow />
    <MultiUnitContent />
  </div>
);

const MultiUnitAddContainerMemo = memo(MultiUnitAddContainer, areEqual);

export { MultiUnitAddContainerMemo as MultiUnitAdd };
