import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { RocketDryContext, RocketDryFunctions } from 'Context/RocketDry';

interface Props {
  children: ReactNode;
}

const RocketDryProvider = ({ children }: Props) => {
  const rocketDry = RocketDryFunctions();

  return <RocketDryContext.Provider value={{ ...rocketDry }}>{children}</RocketDryContext.Provider>;
};

const RocketDryProviderMemo = memo(RocketDryProvider, areEqual);

export { RocketDryProviderMemo as RocketDryProvider };
