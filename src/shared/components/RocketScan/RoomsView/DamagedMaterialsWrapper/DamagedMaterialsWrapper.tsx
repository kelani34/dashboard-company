import { DamagedMaterialsProvider } from 'Context/RocketScan';
import { DamagedMaterials } from 'Containers/RocketScan';
import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  roomId: number;
  roomDamagedMaterials: any[];
}

const DamagedMaterialsWrapper = ({ roomId, roomDamagedMaterials }: Props) => (
  <DamagedMaterialsProvider roomId={roomId} roomDamagedMaterials={roomDamagedMaterials}>
    <DamagedMaterials />
  </DamagedMaterialsProvider>
);

const DamagedMaterialsWrapperMemo = memo(DamagedMaterialsWrapper, areEqual);

export { DamagedMaterialsWrapperMemo as DamagedMaterialsWrapper };
