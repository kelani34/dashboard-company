import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Copy from '../../../Assets/copy.svg';

// Custom css
import classes from './copy.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CopySvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Copy id={id} className={`${classes.copyBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

CopySvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CopySvgMemo = memo(CopySvg, areEqualShallow);
export { CopySvgMemo as CopySvg };
