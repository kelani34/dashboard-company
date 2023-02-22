import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { NoDamageSelected, DamageTypeItem } from 'Components/ProjectData';

import classes from './damageTypeItems.module.css';

interface Props {
  propertyDamageTypes: any[];
  onEditButtonClick: (e: any) => void;
}

const DamageTypeItems = ({ propertyDamageTypes, onEditButtonClick }: Props) =>
  propertyDamageTypes.length > 0 ? (
    <div className={classes.damageTypeItems}>
      {propertyDamageTypes.map((damageType) => (
        <DamageTypeItem key={damageType.id} damageType={damageType} />
      ))}
    </div>
  ) : (
    <NoDamageSelected onAddDamagesButtonClick={onEditButtonClick} />
  );

const DamageTypeItemsMemo = memo(DamageTypeItems, areEqual);

export { DamageTypeItemsMemo as DamageTypeItems };
