import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Floor from '../../../Assets/floor.svg';
import FloorSm from '../../../Assets/floor-sm.svg';
import FloorAdd from '../../../Assets/floor-add.svg';

// Custom css
import classes from './floor.module.css';

interface Props {
  className?: string;
  id?: string;
  svgItem?: number;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const FloorSvg = ({ className = '', id, svgItem, onClick, onKeyUp }: Props) => {
  switch (svgItem) {
    case 2:
      return (
        <FloorSm id={id} className={`${classes.floorBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    case 3:
      return (
        <FloorAdd id={id} className={`${classes.floorBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    default:
      return (
        <Floor id={id} className={`${classes.floorBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
  }
};

FloorSvg.defaultProps = {
  className: undefined,
  id: undefined,
  svgItem: 1,
  onClick: undefined,
  onKeyUp: undefined,
};

const FloorSvgMemo = memo(FloorSvg, areEqualShallow);
export { FloorSvgMemo as FloorSvg };
