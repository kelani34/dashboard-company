import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";

import classes from "Containers/SingleUnitAdd/singleUnitAdd.module.css";

import { UnitHeader } from "Components/Project/Unit";
import { UnitContent } from "Containers/Project/Unit/UnitContent";
import { PhotoFilter } from "Containers/PhotoFilter";

interface Props {
  unitName: string;
  unitId: number;
  type: string;
}

const MultiUnitListContainer = ({ unitName, unitId, type }: Props) => (
  <div className={`d-flex flex-column justify-content-flex-start w-100 ${classes.containerWrapper}`}>
    <div className="d-flex w-100 justify-content-center">
      <PhotoFilter />
    </div>
    <UnitHeader unitName={unitName} unitType={type} />
    <UnitContent id={unitId} type={type} />
  </div>
);

const MultiUnitListContainerMemo = memo(MultiUnitListContainer, areEqual);

export { MultiUnitListContainerMemo as MultiUnitListContainer };
