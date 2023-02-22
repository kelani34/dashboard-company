import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";
import { MultiUnitAddContent } from "Containers/Project/AddLocations/MultiUnitAddRoom/MultiUnitContent";
import { MultiUnitHeader } from "Containers/Project/AddLocations/MultiUnitAddRoom/MultiUnitHeader";

const MultiUnitAddRoomContainer = () => (
  <div className="d-flex flex-column justify-content-flex-start w-100 px-3">
    <MultiUnitHeader />
    <MultiUnitAddContent />
  </div>
);

const MultiUnitAddRoomContainerMemo = memo(MultiUnitAddRoomContainer, areEqual);

export { MultiUnitAddRoomContainerMemo as MultiUnitAddRoom };
