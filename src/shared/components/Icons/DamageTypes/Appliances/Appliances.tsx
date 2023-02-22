import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Appliances from '../../../../Assets/appliances.svg';
import Appliances32 from '../../../../Assets/appliances-sm.svg';

// Custom css
import classes from './appliances.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const AppliancesSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case '32':
      return (
        <Appliances32
          id={id}
          className={`${classes.appliancesBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <Appliances
          id={id}
          className={`${classes.appliancesBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

AppliancesSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const AppliancesSvgMemo = memo(AppliancesSvg, areEqualShallow);
export { AppliancesSvgMemo as AppliancesSvg };
