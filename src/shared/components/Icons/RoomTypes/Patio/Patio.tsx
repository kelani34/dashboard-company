import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Patio from '../../../../Assets/patio.svg';

// Custom css
import classes from './patio.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const PatioSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Patio id={id} className={`${classes.patioBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

PatioSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const PatioSvgMemo = memo(PatioSvg, areEqualShallow);
export { PatioSvgMemo as PatioSvg };
