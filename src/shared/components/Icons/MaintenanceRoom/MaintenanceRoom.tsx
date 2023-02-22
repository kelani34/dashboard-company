import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import MaintenanceRoom from '../../../Assets/maintenance-room.svg';

// Custom css
import classes from './maintenanceRoom.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const MaintenanceRoomSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <MaintenanceRoom
    id={id}
    className={`${classes.maintenanceRoomBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

MaintenanceRoomSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const MaintenanceRoomSvgMemo = memo(MaintenanceRoomSvg, areEqualShallow);
export { MaintenanceRoomSvgMemo as MaintenanceRoomSvg };
