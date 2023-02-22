import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { LossDataContext, LossDataFunctions } from 'Context/LossData';

interface Props {
  children: ReactNode;
}

const LossDataProvider = ({ children }: Props) => {
  const lossData = LossDataFunctions();

  return <LossDataContext.Provider value={{ ...lossData }}>{children}</LossDataContext.Provider>;
};

const LossDataProviderMemo = memo(LossDataProvider, areEqual);
export { LossDataProviderMemo as LossDataProvider };
