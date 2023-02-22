import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { LocationsViewContext, LocationsViewFunctions } from 'Context/Project/LocationsView';

interface Props {
  children: ReactNode;
}

const LocationsViewProvider = ({ children }: Props) => {
  const locationsView = LocationsViewFunctions();

  return <LocationsViewContext.Provider value={{ ...locationsView }}>{children}</LocationsViewContext.Provider>;
};

const LocationsViewProviderMemo = memo(LocationsViewProvider, areEqual);

export { LocationsViewProviderMemo as LocationsViewProvider };
