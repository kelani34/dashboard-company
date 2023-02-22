import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Plumbing from '../../../../Assets/plumbing.svg';
import Plumbing32 from '../../../../Assets/plumbing-32.svg';
// reusing for now....possible asset change in the future

// Custom css
import classes from './plumbing.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const PlumbingSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case '32':
      return (
        <Plumbing32
          id={id}
          className={`${classes.plumbingBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <Plumbing
          id={id}
          className={`${classes.plumbingBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

PlumbingSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const PlumbingSvgMemo = memo(PlumbingSvg, areEqualShallow);
export { PlumbingSvgMemo as PlumbingSvg };
