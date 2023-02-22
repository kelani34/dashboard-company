import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Basement from '../../../../Assets/basement.svg';

// Custom css
import classes from './basement.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const BasementSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Basement id={id} className={`${classes.basementBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

BasementSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const BasementSvgMemo = memo(BasementSvg, areEqualShallow);
export { BasementSvgMemo as BasementSvg };
