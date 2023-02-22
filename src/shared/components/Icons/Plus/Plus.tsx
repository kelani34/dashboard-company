import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Plus from '../../../Assets/plus.svg';

// Custom css
import classes from './plus.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const PlusSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Plus
    id={id}
    className={`${classes.plusBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

PlusSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const PlusSvgMemo = memo(PlusSvg, areEqualShallow);
export { PlusSvgMemo as PlusSvg };