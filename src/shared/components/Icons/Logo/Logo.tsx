import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Logo from '../../../Assets/logo.svg';

// Custom css
import classes from './logo.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const LogoSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Logo id={id} className={`${classes.logoBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

LogoSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const LogoSvgMemo = memo(LogoSvg, areEqualShallow);
export { LogoSvgMemo as LogoSvg };
