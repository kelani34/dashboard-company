import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { DamagedMaterialsContext, DamagedMaterialFunctions } from '.';

interface Props {
  roomId: number;
  roomDamagedMaterials: any[];
  children: ReactNode;
}

const DamagedMaterialsProvider = ({ children, roomId, roomDamagedMaterials }: Props) => {
  const damagedMaterials = DamagedMaterialFunctions(roomId, roomDamagedMaterials);

  return (
    <DamagedMaterialsContext.Provider value={{ ...damagedMaterials }}>{children}</DamagedMaterialsContext.Provider>
  );
};

const DamagedMaterialsProviderMemo = memo(DamagedMaterialsProvider, areEqual);

export { DamagedMaterialsProviderMemo as DamagedMaterialsProvider };
