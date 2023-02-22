import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Smoke from '../../../../Assets/smoke.svg';

// Custom css
import classes from './smoke.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const SmokeSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Smoke id={id} className={`${classes.smokeBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

SmokeSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const SmokeSvgMemo = memo(SmokeSvg, areEqualShallow);
export { SmokeSvgMemo as SmokeSvg };
