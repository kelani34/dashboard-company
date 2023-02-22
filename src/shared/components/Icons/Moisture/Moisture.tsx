import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Moisture from '../../../Assets/moisture-log.svg';

// Custom css
import classes from './moisture.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const MoistureSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Moisture id={id} className={`${classes.moistureBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

MoistureSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const MoistureSvgMemo = memo(MoistureSvg, areEqualShallow);
export { MoistureSvgMemo as MoistureSvg };
