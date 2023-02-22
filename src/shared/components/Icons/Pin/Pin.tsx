import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Pin from '../../../Assets/pin.svg';

// Custom css
import classes from './pin.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const PinSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Pin id={id} className={`${classes.pinBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

PinSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const PinSvgMemo = memo(PinSvg, areEqualShallow);
export { PinSvgMemo as PinSvg };
