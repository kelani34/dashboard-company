import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Flooring from '../../../../Assets/flooring.svg';
import Flooring32 from '../../../../Assets/flooring-32.svg';
// reusing for now....possible asset change in the future

// Custom css
import classes from './flooring.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const FlooringSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case '32':
      return (
        <Flooring32
          id={id}
          className={`${classes.flooringBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <Flooring
          id={id}
          className={`${classes.flooringBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

FlooringSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const FlooringSvgMemo = memo(FlooringSvg, areEqualShallow);
export { FlooringSvgMemo as FlooringSvg };
