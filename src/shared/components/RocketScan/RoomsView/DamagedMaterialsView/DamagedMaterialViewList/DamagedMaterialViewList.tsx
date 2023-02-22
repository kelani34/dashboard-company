import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { DamagedMaterial } from 'Components/RocketScan';
import classes from './damagedMaterialViewList.module.css';

interface Props {
  materials: any[];
}

const DamagedMaterialViewList = ({ materials }: Props) => (
  <div className={classes.damagedMaterialViewList}>
    {materials.map(({ id, name, quantity, unit_of_measurement: unit, action }: any) => (
      <DamagedMaterial key={id} name={name} quantity={quantity} unitId={unit} actionId={action} />
    ))}
  </div>
);

const DamagedMaterialViewListMemo = memo(DamagedMaterialViewList, areEqual);

export { DamagedMaterialViewListMemo as DamagedMaterialViewList };
