import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Carpentry from '../../../../Assets/carpentry.svg';

// Custom css
import classes from './carpentry.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CarpentrySvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Carpentry id={id} className={`${classes.carpentryBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

CarpentrySvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CarpentrySvgMemo = memo(CarpentrySvg, areEqualShallow);
export { CarpentrySvgMemo as CarpentrySvg };
