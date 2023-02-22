import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { PurpleButton } from 'Components/Button';
import { DamagedMaterialsPlaceholder, DamagedMaterialsView, DamageTypesMenu } from 'Components/RocketScan';
import { DamagedMaterialsModal } from 'Containers/RocketScan';
import classes from './damagedMaterials.module.css';

interface Props {
  roomId: number;
  damagesCount: number;
  editMode: boolean;
  damageTypes: any[];
  onClickEditButton: (e: any) => void;
}

const DamagedMaterials = ({ roomId, damagesCount, editMode, damageTypes, onClickEditButton }: Props) => (
  <div className="d-flex w-100 flex-column">
    <div className={classes.damagedMaterialsHeader}>
      <p className={classes.title}>Damaged Materials</p>
      <PurpleButton className={classes.editButton} onClick={onClickEditButton}>
        {editMode ? 'Done' : 'Edit'}
      </PurpleButton>
    </div>
    {editMode ? (
      <div className={classes.content}>
        <div className="d-flex flex-column justify-content-start w-50">
          <p className={classes.smallTitles}>Damage Types</p>
          <p className={classes.damagesCount}>{`${damagesCount} damages selected`}</p>
          <DamageTypesMenu roomId={roomId} damageTypes={damageTypes} />
        </div>
        <div className={`d-flex flex-column justify-content-start w-50 ${classes.damagedMaterials}`}>
          <DamagedMaterialsPlaceholder />
          <DamagedMaterialsModal />
        </div>
      </div>
    ) : (
      <DamagedMaterialsView damageTypes={damageTypes} roomId={roomId} />
    )}
  </div>
);

const DamagedMaterialsMemo = memo(DamagedMaterials, areEqual);

export { DamagedMaterialsMemo as DamagedMaterials };
