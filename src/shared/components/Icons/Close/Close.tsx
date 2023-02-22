import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Close from '../../../Assets/close.svg';
import CloseSmall from '../../../Assets/close-sm.svg';

// Custom css
import classes from './close.module.css';

interface Props {
  className?: string;
  id?: string;
  type?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const CloseSvg = ({ className = '', id, type, onClick, onKeyUp }: Props) => {
  switch (type) {
    case 'plain-sm':
      return (
        <CloseSmall id={id} className={`${classes.closeBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    default:
      return (
        <Close id={id} className={`${classes.closeBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
  }
};

CloseSvg.defaultProps = {
  className: undefined,
  id: undefined,
  type: 'default-circle',
  onClick: undefined,
  onKeyUp: undefined,
};

const CloseSvgMemo = memo(CloseSvg, areEqualShallow);
export { CloseSvgMemo as CloseSvg };
