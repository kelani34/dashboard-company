import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import MeetingRoom from '../../../Assets/meeting-room.svg';

// Custom css
import classes from './meetingRoom.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const MeetingRoomSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <MeetingRoom
    id={id}
    className={`${classes.meetingRoomBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

MeetingRoomSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const MeetingRoomSvgMemo = memo(MeetingRoomSvg, areEqualShallow);
export { MeetingRoomSvgMemo as MeetingRoomSvg };
