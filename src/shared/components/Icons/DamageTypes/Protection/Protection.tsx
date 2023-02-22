import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Protection from '../../../../Assets/protection.svg';

// Custom css
import classes from './protection.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ProtectionSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Protection id={id} className={`${classes.protectionBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

ProtectionSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ProtectionSvgMemo = memo(ProtectionSvg, areEqualShallow);
export { ProtectionSvgMemo as ProtectionSvg };
