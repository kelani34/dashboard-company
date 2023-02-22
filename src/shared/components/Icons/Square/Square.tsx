import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Square from '../../../Assets/square.svg';

// Custom css
import classes from './square.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const SquareSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Square id={id} className={`${classes.actionsDefaultBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

SquareSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const SquareSvgMemo = memo(SquareSvg, areEqualShallow);
export { SquareSvgMemo as SquareSvg };
