import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import LunchRoom from '../../../Assets/lunchroom.svg';

// Custom css
import classes from './lunchRoom.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const LunchRoomSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <LunchRoom id={id} className={`${classes.lunchRoomBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

LunchRoomSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const LunchRoomSvgMemo = memo(LunchRoomSvg, areEqualShallow);
export { LunchRoomSvgMemo as LunchRoomSvg };
