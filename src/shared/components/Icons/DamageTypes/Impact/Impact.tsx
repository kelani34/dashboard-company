import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Impact from '../../../../Assets/impact.svg';

// Custom css
import classes from './impact.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ImpactSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Impact id={id} className={`${classes.impactBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

ImpactSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ImpactSvgMemo = memo(ImpactSvg, areEqualShallow);
export { ImpactSvgMemo as ImpactSvg };
