import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { RoomButton } from 'Components/Button/RoomButton';
import { Icon } from 'Components/Icons';

import classes from './rocketDryBody.module.css';

interface Props {
  content: ReactNode;
  onEquipmentButtonClick: (e: any) => void;
  onMoistureButtonClick: (e: any) => void;
}

const RocketDryBody = ({ content, onEquipmentButtonClick, onMoistureButtonClick }: Props) => (
  <div className={classes.bodyArea}>
    <div className={classes.buttonColumn}>
      <RoomButton className={classes.roomButtonWrapper} onClick={onEquipmentButtonClick}>
        <Icon type="equipment" className={classes.iconContent} />
        Equipment Log
      </RoomButton>
      <hr />
      <RoomButton className={classes.roomButtonWrapper} onClick={onMoistureButtonClick}>
        <Icon type="moisture" className={classes.iconContent} />
        Moisture/Atmospheric
      </RoomButton>
    </div>

    {content && <div className={classes.contentColumn}>{content}</div>}
  </div>
);

const RocketDryBodyMemo = memo(RocketDryBody, areEqual);

export { RocketDryBodyMemo as RocketDryBody };
