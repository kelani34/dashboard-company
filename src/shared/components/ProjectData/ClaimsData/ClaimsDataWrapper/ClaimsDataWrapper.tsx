import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { ClaimsDataProvider } from 'Context/ClaimsData';
import { ClaimsData } from 'Containers/ProjectData';

const ClaimsDataWrapper = () => (
  <ClaimsDataProvider>
    <ClaimsData />
  </ClaimsDataProvider>
);

const ClaimsDataWrapperMemo = memo(ClaimsDataWrapper, areEqual);

export { ClaimsDataWrapperMemo as ClaimsDataWrapper };
