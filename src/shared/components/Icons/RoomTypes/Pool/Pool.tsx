import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Pool from '../../../../Assets/pool.svg';

// Custom css
import classes from './pool.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const PoolSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Pool id={id} className={`${classes.poolBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

PoolSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const PoolSvgMemo = memo(PoolSvg, areEqualShallow);
export { PoolSvgMemo as PoolSvg };
