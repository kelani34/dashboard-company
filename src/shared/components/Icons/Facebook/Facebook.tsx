import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Facebook from '../../../Assets/facebook.svg';

// Custom css
import classes from './facebook.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const FacebookSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Facebook id={id} className={`${classes.facebookBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

FacebookSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const FacebookSvgMemo = memo(FacebookSvg, areEqualShallow);
export { FacebookSvgMemo as FacebookSvg };
