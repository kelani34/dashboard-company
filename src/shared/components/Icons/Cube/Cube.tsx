import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Cube from '../../../Assets/cube.svg';

// Custom css
import classes from './cube.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CubeSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Cube id={id} className={`${classes.cubeBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

CubeSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CubeSvgMemo = memo(CubeSvg, areEqualShallow);
export { CubeSvgMemo as CubeSvg };
