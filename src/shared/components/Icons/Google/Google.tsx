import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Google from '../../../Assets/google.svg';

// Custom css
import classes from './google.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const GoogleSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Google id={id} className={`${classes.googleBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

GoogleSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const GoogleSvgMemo = memo(GoogleSvg, areEqualShallow);
export { GoogleSvgMemo as GoogleSvg };
