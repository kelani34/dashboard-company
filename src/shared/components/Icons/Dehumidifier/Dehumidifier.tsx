import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Dehumidifier from '../../../Assets/dehumidifier.svg';

// Custom css
import classes from './dehumidifier.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const DehumidifierSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Dehumidifier
    id={id}
    className={`${classes.dehumidifierBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

DehumidifierSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const DehumidifierSvgMemo = memo(DehumidifierSvg, areEqualShallow);
export { DehumidifierSvgMemo as DehumidifierSvg };
