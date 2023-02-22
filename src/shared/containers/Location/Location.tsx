import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";

const LocationContainer = () => <div>text</div>;

const LocationContainerMemo = memo(LocationContainer, areEqual);

export { LocationContainerMemo as LocationContainer };
