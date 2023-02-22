import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Phone from '../../../Assets/phone.svg';

// Custom css
import classes from './phone.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const PhoneSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Phone id={id} className={`${classes.phoneBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

PhoneSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const PhoneSvgMemo = memo(PhoneSvg, areEqualShallow);
export { PhoneSvgMemo as PhoneSvg };
