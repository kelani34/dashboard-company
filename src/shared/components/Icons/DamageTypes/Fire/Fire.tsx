import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Fire from '../../../../Assets/fire.svg';

// Custom css
import classes from './fire.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const FireSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Fire id={id} className={`${classes.fireBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

FireSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const FireSvgMemo = memo(FireSvg, areEqualShallow);
export { FireSvgMemo as FireSvg };
