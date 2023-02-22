import React, { memo, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDamagedMaterialFunctions } from 'Context/RocketScan';
import { DamagedMaterialScope } from 'Components/RocketScan';

interface Props {
  quantity?: number;
  unitId?: number;
  actionId?: number;
}

const DamagedMaterialScopeContainer = ({ quantity, unitId, actionId }: Props) => {
  const { unitOfMeasurementTypes, scopeActionTypes }: any = useDamagedMaterialFunctions();
  const [unitOfMeasurementName, setUnitOfMeasurementName] = useState('');
  const [scopeActionName, setScopeActionName] = useState('');

  useEffect(() => {
    if (unitId && unitOfMeasurementTypes?.length > 0) {
      const uom = unitOfMeasurementTypes.find((type: any) => type.id === unitId);
      if (uom) {
        setUnitOfMeasurementName(uom.name);
      }
    }
  }, [unitOfMeasurementTypes]);

  useEffect(() => {
    if (actionId && scopeActionTypes?.length > 0) {
      const sa = scopeActionTypes.find((type: any) => type.id === actionId);
      if (sa) {
        setScopeActionName(sa.name);
      }
    }
  }, [scopeActionTypes]);

  return <DamagedMaterialScope quantity={quantity} unit={unitOfMeasurementName} action={scopeActionName} />;
};

DamagedMaterialScopeContainer.defaultProps = {
  quantity: undefined,
  unitId: undefined,
  actionId: undefined,
};

const DamagedMaterialScopeContainerMemo = memo(DamagedMaterialScopeContainer, areEqual);

export { DamagedMaterialScopeContainerMemo as DamagedMaterialScopeContainer };
