import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import AirMover from '../../../Assets/air-mover.svg';

// Custom css
import classes from './airMover.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const AirMoverSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <AirMover id={id} className={`${classes.airMoverBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

AirMoverSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const AirMoverSvgMemo = memo(AirMoverSvg, areEqualShallow);
export { AirMoverSvgMemo as AirMoverSvg };
