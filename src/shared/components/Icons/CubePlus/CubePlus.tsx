import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import CubePlus from '../../../Assets/cube-plus.svg';

// Custom css
import classes from './cubePlus.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CubePlusSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <CubePlus id={id} className={`${classes.cubePlusBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

CubePlusSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CubePlusSvgMemo = memo(CubePlusSvg, areEqualShallow);
export { CubePlusSvgMemo as CubePlusSvg };
