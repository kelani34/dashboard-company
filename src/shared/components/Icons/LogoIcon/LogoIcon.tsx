import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import LogoIcon from '../../../Assets/logo-icon.svg';

// Custom css
import classes from './logoIcon.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const LogoIconSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <LogoIcon id={id} className={`${classes.logoIconBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

LogoIconSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const LogoIconSvgMemo = memo(LogoIconSvg, areEqualShallow);
export { LogoIconSvgMemo as LogoIconSvg };
