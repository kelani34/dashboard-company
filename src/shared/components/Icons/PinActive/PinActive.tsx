import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import PinActive from '../../../Assets/pinActive.svg';

// Custom css
import classes from './pinActive.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const PinActiveSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <PinActive id={id} className={`${classes.pinBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

PinActiveSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const PinActiveSvgMemo = memo(PinActiveSvg, areEqualShallow);
export { PinActiveSvgMemo as PinActiveSvg };
