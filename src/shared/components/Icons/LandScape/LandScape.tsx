import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import LandScape from '../../../Assets/landscape.svg';

import classes from './landscape.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const LandScapeSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <LandScape id={id} className={`${classes.landscapeBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

LandScapeSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const LandScapeSvgMemo = memo(LandScapeSvg, areEqualShallow);
export { LandScapeSvgMemo as LandScapeSvg };
