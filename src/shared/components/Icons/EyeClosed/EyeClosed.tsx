import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import EyeClosed from '../../../Assets/eye-closed.svg';

// Custom css
import classes from './eyeClosed.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const EyeClosedSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <EyeClosed id={id} className={`${classes.iconBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

EyeClosedSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const EyeClosedSvgMemo = memo(EyeClosedSvg, areEqual);
export { EyeClosedSvgMemo as EyeClosedSvg };
