import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Icon, RoomIcon } from 'Components/Icons';
import { EquipmentCount, NoEquipmentPlaceholder } from 'Components/RocketDry';

import { trimAndToLowerCase } from 'Utils/helpers';

import classes from './totalEquipment.module.css';

interface Props {
  equipmentList: any;
}

const TotalEquipment = ({ equipmentList }: Props) =>
  equipmentList?.length > 0 ? (
    <div className={classes.container}>
      {equipmentList.map(
        (equipmentChunk: any) =>
          equipmentChunk?.length > 0 && (
            <div key={equipmentChunk[0].id} className={classes.itemsRow}>
              {equipmentChunk.map((equipment) => (
                <EquipmentCount
                  key={equipment.id}
                  name={equipment.name}
                  icon={
                    equipment.is_standard ? (
                      <Icon type={trimAndToLowerCase(equipment.name)} />
                    ) : (
                      <RoomIcon type="customroom" />
                    )
                  }
                  count={equipment.sum_quantity}
                />
              ))}
            </div>
          )
      )}
    </div>
  ) : (
    <NoEquipmentPlaceholder />
  );

const TotalEquipmentMemo = memo(TotalEquipment, areEqual);

export { TotalEquipmentMemo as TotalEquipment };
