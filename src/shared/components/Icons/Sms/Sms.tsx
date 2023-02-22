import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Sms from '../../../Assets/sms-icon.svg';

// Custom css
import classes from './sms.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const SmsSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Sms id={id} className={`${classes.smsBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

SmsSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const SmsSvgMemo = memo(SmsSvg, areEqualShallow);
export { SmsSvgMemo as SmsSvg };
