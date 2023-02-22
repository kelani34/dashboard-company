import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Electrical from '../../../../Assets/electrical.svg';
import Electrical32 from '../../../../Assets/electrical-32.svg';

// Custom css
import classes from './electrical.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ElectricalSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case '32':
      return (
        <Electrical32
          id={id}
          className={`${classes.electricalBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <Electrical
          id={id}
          className={`${classes.electricalBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

ElectricalSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ElectricalSvgMemo = memo(ElectricalSvg, areEqualShallow);
export { ElectricalSvgMemo as ElectricalSvg };
