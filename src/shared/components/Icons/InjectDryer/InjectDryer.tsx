import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import InjectDryer from '../../../Assets/inject-dryer.svg';

// Custom css
import classes from './injectDryer.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const InjectDryerSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <InjectDryer
    id={id}
    className={`${classes.injectDryerBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

InjectDryerSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const InjectDryerSvgMemo = memo(InjectDryerSvg, areEqualShallow);
export { InjectDryerSvgMemo as InjectDryerSvg };
