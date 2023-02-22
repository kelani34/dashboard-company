import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Apple from '../../../Assets/apple.svg';

// Custom css
import classes from './apple.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const AppleSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Apple id={id} className={`${classes.appleBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

AppleSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const AppleSvgMemo = memo(AppleSvg, areEqualShallow);
export { AppleSvgMemo as AppleSvg };
