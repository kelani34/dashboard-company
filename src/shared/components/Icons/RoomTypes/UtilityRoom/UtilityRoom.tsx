import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import UtilityRoom from '../../../../Assets/utilityroom.svg';

// Custom css
import classes from './utilityroom.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const UtilityRoomSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <UtilityRoom
    id={id}
    className={`${classes.utilityroomBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

UtilityRoomSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const UtilityRoomSvgMemo = memo(UtilityRoomSvg, areEqualShallow);
export { UtilityRoomSvgMemo as UtilityRoomSvg };
