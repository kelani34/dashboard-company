import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import ThreeDots from '../../../Assets/three-dots.svg';

// Custom css
import classes from './threeDots.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ThreeDotsSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <ThreeDots id={id} className={`${classes.threeDotsBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

ThreeDotsSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ThreeDotsSvgMemo = memo(ThreeDotsSvg, areEqualShallow);
export { ThreeDotsSvgMemo as ThreeDotsSvg };
