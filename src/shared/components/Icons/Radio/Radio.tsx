import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Radio from '../../../Assets/radio.svg';

// Custom css
import classes from './radio.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const RadioSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Radio id={id} className={`${classes.iconBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

RadioSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const RadioSvgMemo = memo(RadioSvg, areEqualShallow);
export { RadioSvgMemo as RadioSvg };
