import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Cleaning from '../../../../Assets/cleaning.svg';

// Custom css
import classes from './cleaning.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CleaningSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Cleaning id={id} className={`${classes.cleaningBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

CleaningSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CleaningSvgMemo = memo(CleaningSvg, areEqualShallow);
export { CleaningSvgMemo as CleaningSvg };
