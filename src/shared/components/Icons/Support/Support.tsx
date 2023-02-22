import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Support from '../../../Assets/support.svg';

// Custom css
import classes from './support.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const SupportSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Support id={id} className={`${classes.iconBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

SupportSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const SupportSvgMemo = memo(SupportSvg, areEqualShallow);

export { SupportSvgMemo as SupportSvg };
