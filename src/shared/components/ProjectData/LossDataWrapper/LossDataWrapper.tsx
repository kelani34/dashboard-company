import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { LossDataProvider } from 'Context/LossData';
import { LossData } from 'Containers/ProjectData';

const LossDataWrapper = () => (
  <LossDataProvider>
    <LossData />
  </LossDataProvider>
);

const LossDataWrapperMemo = memo(LossDataWrapper, areEqual);

export { LossDataWrapperMemo as LossDataWrapper };
