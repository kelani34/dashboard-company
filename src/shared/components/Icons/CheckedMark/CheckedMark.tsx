import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import CheckedMark from '../../../Assets/checked-mark.svg';
import CheckedMarkPurple from '../../../Assets/checked-mark-purple-bg.svg';

// Custom css
import classes from './checkedMark.module.css';

interface Props {
  className?: string;
  id?: string;
  type?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const CheckedMarkSvg = ({ className = '', id, type, onClick, onKeyUp }: Props) => {
  switch (type) {
    case 'purple-bg':
      return (
        <CheckedMarkPurple
          id={id}
          className={`${classes.checkedMarkBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <CheckedMark
          id={id}
          className={`${classes.checkedMarkBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

CheckedMarkSvg.defaultProps = {
  className: undefined,
  id: undefined,
  type: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CheckedMarkSvgMemo = memo(CheckedMarkSvg, areEqualShallow);
export { CheckedMarkSvgMemo as CheckedMarkSvg };
