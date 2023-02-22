import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';
import { EquipmentCount, NoEquipmentPlaceholder } from 'Components/RocketDry';

import { trimAndToLowerCase } from 'Utils/helpers';

import classes from './locationEquipment.module.css';

interface Props {
  equipmentList: any;
  onInfoIconClick?: (e: any) => void;
}

const LocationEquipment = ({ equipmentList, onInfoIconClick }: Props) =>
  equipmentList?.length > 0 ? (
    <div className={classes.container}>
      <Button className={classes.infoPopupButton} onClick={onInfoIconClick}>
        <Icon type="info" className={classes.infoIcon} />
      </Button>
      {equipmentList.map((equipment) => (
        <div key={equipment.id} className={classes.itemsRow}>
          <EquipmentCount
            name={equipment.display_name}
            icon={<Icon type={trimAndToLowerCase(equipment.name)} />}
            count={equipment.quantity}
          />
          <div className={classes.innerContainer}>X</div>
          <div className={classes.innerContainer}>{equipment.duration} Days</div>
        </div>
      ))}
    </div>
  ) : (
    <NoEquipmentPlaceholder />
  );

LocationEquipment.defaultProps = {
  onInfoIconClick: undefined,
};

const LocationEquipmentMemo = memo(LocationEquipment, areEqual);

export { LocationEquipmentMemo as LocationEquipment };
