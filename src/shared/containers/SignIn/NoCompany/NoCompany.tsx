import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";

import { NoCompany } from "Components/SignIn/NoCompany";

const NoCompanyContainer = () => <NoCompany />;

const NoCompanyContainerMemo = memo(NoCompanyContainer, areEqual);

export { NoCompanyContainerMemo as NoCompany };
