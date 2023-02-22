import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import ExteriorDamage from '../../../../Assets/exterior.svg';
import Exterior32 from '../../../../Assets/exterior-32.svg';
// reusing for now....possible asset change in the future

// Custom css
import classes from './exteriorDamage.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ExteriorDamageSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case '32':
      return (
        <Exterior32
          id={id}
          className={`${classes.exteriorDamageBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <ExteriorDamage
          id={id}
          className={`${classes.exteriorDamageBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

ExteriorDamageSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ExteriorDamageSvgMemo = memo(ExteriorDamageSvg, areEqualShallow);
export { ExteriorDamageSvgMemo as ExteriorDamageSvg };
