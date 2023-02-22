import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import ConfirmChecked from '../../../Assets/confirm.svg';
import ConfirmCheckedSm from '../../../Assets/confirm-sm.svg';
import ConfirmCheckedPurple from '../../../Assets/confirm-purple.svg';

// Custom css
import classes from './confirmChecked.module.css';

interface Props {
  className?: string;
  id?: string;
  svgItem?: number;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ConfirmCheckedSvg = ({ className = '', id, svgItem, onClick, onKeyUp }: Props) => {
  switch (svgItem) {
    case 3:
      return (
        <ConfirmCheckedPurple
          id={id}
          className={`${classes.confirmCheckedBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    case 2:
      return (
        <ConfirmCheckedSm
          id={id}
          className={`${classes.confirmCheckedBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <ConfirmChecked
          id={id}
          className={`${classes.confirmCheckedBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

ConfirmCheckedSvg.defaultProps = {
  className: undefined,
  id: undefined,
  svgItem: 1,
  onClick: undefined,
  onKeyUp: undefined,
};

const ConfirmCheckedSvgMemo = memo(ConfirmCheckedSvg, areEqualShallow);
export { ConfirmCheckedSvgMemo as ConfirmCheckedSvg };
