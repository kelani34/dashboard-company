import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import Eye from '../../../Assets/eye.svg';

// Custom css
import classes from './eye.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const EyeSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Eye id={id} className={`${classes.iconBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

EyeSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const EyeSvgMemo = memo(EyeSvg, areEqual);
export { EyeSvgMemo as EyeSvg };
