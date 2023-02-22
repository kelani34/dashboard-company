import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { RoomContext, roomFunctions } from 'Context/RocketScan/Room/RoomContext';

interface Props {
  children: ReactNode;
}

const RoomProvider = ({ children }: Props) => {
  const functions = roomFunctions();

  return <RoomContext.Provider value={{ ...functions }}>{children}</RoomContext.Provider>;
};

const RoomProviderMemo = memo(RoomProvider, areEqual);

export { RoomProviderMemo as RoomProvider };
