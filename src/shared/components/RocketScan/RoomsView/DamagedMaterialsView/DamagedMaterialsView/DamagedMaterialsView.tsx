import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { DamagedType } from 'Containers/RocketScan';

interface Props {
  roomId: number;
  damageTypes: any[];
}

const DamagedMaterialsView = ({ roomId, damageTypes }: Props) => (
  <div className="d-flex w-100 flex-wrap pt-3">
    {damageTypes.map((damageType: any) => (
      <DamagedType key={`${roomId}-${damageType.id}`} damageType={damageType} />
    ))}
  </div>
);

const DamagedMaterialsViewMemo = memo(DamagedMaterialsView, areEqual);

export { DamagedMaterialsViewMemo as DamagedMaterialsView };
