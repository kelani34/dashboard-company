import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { MoistureAtmosphericContext, MoistureAtmosphericFunctions } from 'Context/MoistureAtmospheric';

interface Props {
  children: ReactNode;
}

const MoistureAtmosphericProvider = ({ children }: Props) => {
  const moistureAtmospheric = MoistureAtmosphericFunctions();

  return (
    <MoistureAtmosphericContext.Provider value={{ ...moistureAtmospheric }}>
      {children}
    </MoistureAtmosphericContext.Provider>
  );
};

const MoistureAtmosphericProviderMemo = memo(MoistureAtmosphericProvider, areEqual);

export { MoistureAtmosphericProviderMemo as MoistureAtmosphericProvider };
