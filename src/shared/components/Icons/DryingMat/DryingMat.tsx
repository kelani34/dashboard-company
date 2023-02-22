import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import DryingMat from '../../../Assets/drying-mat.svg';

// Custom css
import classes from './dryingMat.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const DryingMatSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <DryingMat id={id} className={`${classes.dryingMatBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

DryingMatSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const DryingMatSvgMemo = memo(DryingMatSvg, areEqualShallow);
export { DryingMatSvgMemo as DryingMatSvg };
