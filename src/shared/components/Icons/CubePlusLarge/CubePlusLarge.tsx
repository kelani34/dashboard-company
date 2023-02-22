import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import CubePlusLg from '../../../Assets/cube-plus-lg.svg';

// Custom css
import classes from './cubePlusLg.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CubePlusLgSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <CubePlusLg id={id} className={`${classes.cubePlusLgBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

CubePlusLgSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CubePlusLgSvgMemo = memo(CubePlusLgSvg, areEqualShallow);
export { CubePlusLgSvgMemo as CubePlusLgSvg };
