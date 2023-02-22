import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Walls from '../../../../Assets/walls.svg';
import Walls32 from '../../../../Assets/walls-32.svg';
// reusing for now....possible asset change in the future

// Custom css
import classes from './walls.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const WallsSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case '32':
      return (
        <Walls32 id={id} className={`${classes.wallsBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    default:
      return (
        <Walls id={id} className={`${classes.wallsBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
  }
};

WallsSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const WallsSvgMemo = memo(WallsSvg, areEqualShallow);
export { WallsSvgMemo as WallsSvg };
