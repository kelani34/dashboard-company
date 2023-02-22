import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Water from '../../../../Assets/water.svg';

// Custom css
import classes from './water.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const WaterSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Water id={id} className={`${classes.waterBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

WaterSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const WaterSvgMemo = memo(WaterSvg, areEqualShallow);
export { WaterSvgMemo as WaterSvg };
