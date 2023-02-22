import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Ceiling from '../../../../Assets/ceiling.svg';
import Ceiling32 from '../../../../Assets/ceiling-sm.svg';

// Custom css
import classes from './ceiling.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CeilingSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case '32':
      return (
        <Ceiling32
          id={id}
          className={`${classes.ceilingBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <Ceiling id={id} className={`${classes.ceilingBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
  }
};

CeilingSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CeilingSvgMemo = memo(CeilingSvg, areEqualShallow);
export { CeilingSvgMemo as CeilingSvg };
