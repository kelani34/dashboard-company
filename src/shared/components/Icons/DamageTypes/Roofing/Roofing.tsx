import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Roofing from '../../../../Assets/roofing.svg';
import Roofing32 from '../../../../Assets/roofing-32.svg';
// reusing for now....possible asset change in the future

// Custom css
import classes from './roofing.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const RoofingSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case '32':
      return (
        <Roofing32
          id={id}
          className={`${classes.roofingBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <Roofing id={id} className={`${classes.roofingBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
  }
};

RoofingSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const RoofingSvgMemo = memo(RoofingSvg, areEqualShallow);
export { RoofingSvgMemo as RoofingSvg };
