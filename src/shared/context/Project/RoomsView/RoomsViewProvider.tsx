import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { RoomsViewContext, RoomsViewFunctions } from 'Context/Project/RoomsView';

interface Props {
  children: ReactNode;
}

const RoomsViewProvider = ({ children }: Props) => {
  const roomsView = RoomsViewFunctions();

  return <RoomsViewContext.Provider value={{ ...roomsView }}>{children}</RoomsViewContext.Provider>;
};

const RoomsViewProviderMemo = memo(RoomsViewProvider, areEqual);

export { RoomsViewProviderMemo as RoomsViewProvider };
