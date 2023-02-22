import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import MultiUnit from '../../../Assets/multiunit-lg.svg';

// Custom css
import classes from './multiunit.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const MultiUnitSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <MultiUnit id={id} className={`${classes.multiunitBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

MultiUnitSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const MultiUnitSvgMemo = memo(MultiUnitSvg, areEqualShallow);
export { MultiUnitSvgMemo as MultiUnitSvg };
