import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import Exterior from '../../../Assets/exterior.svg';
import ExteriorAdd from '../../../Assets/exterior-add.svg';

// Custom css
import classes from './exterior.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: number;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const ExteriorSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case 2:
      return (
        <ExteriorAdd
          id={id}
          className={`${classes.exteriorBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <Exterior
          id={id}
          className={`${classes.exteriorBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

ExteriorSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: 1,
  onClick: undefined,
  onKeyUp: undefined,
};

const ExteriorSvgMemo = memo(ExteriorSvg, areEqual);
export { ExteriorSvgMemo as ExteriorSvg };
