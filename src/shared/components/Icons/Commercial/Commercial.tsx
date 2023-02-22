import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Commercial from '../../../Assets/commercial.svg';

// Custom css
import classes from './commercial.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const CommercialSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Commercial id={id} className={`${classes.closeBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

CommercialSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CommercialSvgMemo = memo(CommercialSvg, areEqualShallow);
export { CommercialSvgMemo as CommercialSvg };
