import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Unit from '../../../Assets/unit.svg';
import UnitSm from '../../../Assets/unit-sm.svg';
import UnitLg from '../../../Assets/unit-lg.svg';
import UnitAdd from '../../../Assets/unit-add.svg';

// Custom css
import classes from './unit.module.css';

interface Props {
  className?: string;
  id?: string;
  svgItem?: number;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const UnitSvg = ({ className = '', id, svgItem, onClick, onKeyUp }: Props) => {
  switch (svgItem) {
    case 2:
      return (
        <UnitSm id={id} className={`${classes.unitBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    case 3:
      return (
        <UnitLg id={id} className={`${classes.unitBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    case 4:
      return (
        <UnitAdd id={id} className={`${classes.unitBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    default:
      return <Unit id={id} className={`${classes.unitBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />;
  }
};

UnitSvg.defaultProps = {
  className: undefined,
  id: undefined,
  svgItem: 1,
  onClick: undefined,
  onKeyUp: undefined,
};

const UnitSvgMemo = memo(UnitSvg, areEqualShallow);
export { UnitSvgMemo as UnitSvg };
