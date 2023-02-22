import React, { memo, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDamagedMaterialFunctions } from 'Context/RocketScan';

import { DamagedMaterialListItem, CreateCustomDamagedMaterial, EditCustomDamagedMaterial } from 'Containers/RocketScan';

const DamagedMaterialListContainer = () => {
  const { selectedDamagedType, damagedMaterials }: any = useDamagedMaterialFunctions();

  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    if (selectedDamagedType) {
      setMaterials(
        damagedMaterials.filter(({ damage_type: { id: damageTypeId } }: any) => selectedDamagedType === damageTypeId)
      );
    }
  }, [selectedDamagedType, damagedMaterials]);

  return (
    <div>
      {materials.length > 0 &&
        materials.map((material: any) =>
          material.is_standard ? (
            <DamagedMaterialListItem key={material.id} material={material} />
          ) : (
            <EditCustomDamagedMaterial key={material.id} material={material} />
          )
        )}
      <CreateCustomDamagedMaterial damageMaterialId={selectedDamagedType} />
    </div>
  );
};
const DamagedMaterialListContainerMemo = memo(DamagedMaterialListContainer, areEqual);

export { DamagedMaterialListContainerMemo as DamagedMaterialListContainer };
