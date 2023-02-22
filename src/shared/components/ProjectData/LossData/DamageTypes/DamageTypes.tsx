import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { DamageTypeItems } from 'Components/ProjectData';

import { DamageIcon } from 'Components/Icons/DamageIcon';
import { TileButton } from 'Components/Button';
import { LossDataDamageTypeButton, CustomDamageTypeModal } from 'Containers/ProjectData';

import classes from './damageTypes.module.css';

interface Props {
  projectDamageTypes: any[];
  isEditing: boolean;
  propertyDamageTypes: any[];
  onEditButtonClick: (e: any) => void;
  onCreateCustomDamageTypeTileClick: (e: any) => void;
}

const DamageTypes = ({
  projectDamageTypes,
  isEditing,
  propertyDamageTypes,
  onEditButtonClick,
  onCreateCustomDamageTypeTileClick,
}: Props) => (
  <div>
    <div className={`d-flex justify-content-between align-items-baseline ${classes.subHeader}`}>
      <div className={classes.mainTitle}>Types of Damages</div>
      <div className={classes.secondaryTitle}>Select Damage Types</div>
    </div>
    {isEditing ? (
      <div className={classes.damageTypeButtons}>
        {projectDamageTypes.map((damageType) => (
          <LossDataDamageTypeButton key={damageType.id} damageType={damageType} />
        ))}
        <TileButton
          caption="Custom"
          className={classes.button}
          icon={<DamageIcon type="addcustom" />}
          onTileClick={onCreateCustomDamageTypeTileClick}
        />
      </div>
    ) : (
      <DamageTypeItems propertyDamageTypes={propertyDamageTypes} onEditButtonClick={onEditButtonClick} />
    )}
    <CustomDamageTypeModal />
  </div>
);

const DamageTypesMemo = memo(DamageTypes, areEqual);

export { DamageTypesMemo as DamageTypes };
