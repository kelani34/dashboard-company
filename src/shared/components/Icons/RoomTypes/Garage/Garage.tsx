import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Garage from '../../../../Assets/garage.svg';

// Custom css
import classes from './garage.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const GarageSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Garage id={id} className={`${classes.garageBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

GarageSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const GarageSvgMemo = memo(GarageSvg, areEqualShallow);
export { GarageSvgMemo as GarageSvg };
