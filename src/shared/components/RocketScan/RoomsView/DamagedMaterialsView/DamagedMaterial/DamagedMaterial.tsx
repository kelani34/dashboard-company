import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';
import { DamagedMaterialScope } from 'Containers/RocketScan';

import classes from './damagedMaterial.module.css';

interface Props {
  name: string;
  quantity?: number;
  unitId?: number;
  actionId?: number;
}

const DamagedMaterial = ({ name, quantity, unitId, actionId }: Props) => (
  <span className={classes.damagedMaterial}>
    <Icon type="dot" className={classes.icon} />
    {name}
    {(quantity || unitId || actionId) && (
      <DamagedMaterialScope quantity={quantity} unitId={unitId} actionId={actionId} />
    )}
  </span>
);

DamagedMaterial.defaultProps = {
  quantity: undefined,
  unitId: undefined,
  actionId: undefined,
};

const DamagedMaterialMemo = memo(DamagedMaterial, areEqual);

export { DamagedMaterialMemo as DamagedMaterial };
