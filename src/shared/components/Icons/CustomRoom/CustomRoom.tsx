import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import CustomRoom from '../../../Assets/custom-room.svg';

// Custom css
import classes from './customRoom.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CustomRoomSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <CustomRoom id={id} className={`${classes.customRoomBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

CustomRoomSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CustomRoomSvgMemo = memo(CustomRoomSvg, areEqualShallow);
export { CustomRoomSvgMemo as CustomRoomSvg };
