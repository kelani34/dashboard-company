import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { ClaimsDataContext, ClaimsDataFunctions } from 'Context/ClaimsData';

interface Props {
  children: ReactNode;
}

const ClaimsDataProvider = ({ children }: Props) => {
  const claimsData = ClaimsDataFunctions();

  return <ClaimsDataContext.Provider value={{ ...claimsData }}>{children}</ClaimsDataContext.Provider>;
};

const ClaimsDataProviderMemo = memo(ClaimsDataProvider, areEqual);

export { ClaimsDataProviderMemo as ClaimsDataProvider };
