import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import NorthFacing from '../../../../Assets/northfacing.svg';
import SouthFacing from '../../../../Assets/southfacing.svg';
import EastFacing from '../../../../Assets/eastfacing.svg';
import WestFacing from '../../../../Assets/westfacing.svg';

import classes from './compass.module.css';

interface Props {
  id?: string;
  className?: string;
  svgItem?: number;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const CompassSvg = ({ id, className, svgItem, onClick, onKeyUp }: Props) => {
  switch (svgItem) {
    case 2:
      return (
        <SouthFacing
          id={id}
          className={`${classes.compassBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    case 3:
      return (
        <EastFacing
          id={id}
          className={`${classes.compassBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    case 4:
      return (
        <WestFacing
          id={id}
          className={`${classes.compassBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <NorthFacing
          id={id}
          className={`${classes.compassBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

CompassSvg.defaultProps = {
  id: undefined,
  className: undefined,
  svgItem: 1,
  onClick: undefined,
  onKeyUp: undefined,
};

const CompassSvgMemo = memo(CompassSvg, areEqual);

export { CompassSvgMemo as CompassSvg };
