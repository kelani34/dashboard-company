import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { DamageTypeButton } from 'Containers/RocketScan';
import classes from './damageTypesMenu.module.css';

interface Props {
  damageTypes: any[];
  roomId: number;
}

const DamageTypesMenu = ({ damageTypes, roomId }: Props) => (
  <div className={`d-flex justify-content-between align-items-center ${classes.damageTypeList}`}>
    {damageTypes.map(({ id, name }) => (
      <DamageTypeButton key={`${roomId}-${id}`} id={id} caption={name} />
    ))}
  </div>
);

const DamageTypesMenuMemo = memo(DamageTypesMenu, areEqual);

export { DamageTypesMenuMemo as DamageTypesMenu };
