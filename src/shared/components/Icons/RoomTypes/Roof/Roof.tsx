import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Roof from '../../../../Assets/roof.svg';

// Custom css
import classes from './roof.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const RoofSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Roof id={id} className={`${classes.roofBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

RoofSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const RoofSvgMemo = memo(RoofSvg, areEqualShallow);
export { RoofSvgMemo as RoofSvg };
