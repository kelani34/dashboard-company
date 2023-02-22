import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Natural from '../../../../Assets/natural.svg';

// Custom css
import classes from './natural.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const NaturalSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Natural id={id} className={`${classes.naturalBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

NaturalSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const NaturalSvgMemo = memo(NaturalSvg, areEqualShallow);
export { NaturalSvgMemo as NaturalSvg };
