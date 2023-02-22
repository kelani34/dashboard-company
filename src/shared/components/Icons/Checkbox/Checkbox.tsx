import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Checkbox from '../../../Assets/checkbox.svg';

// Custom css
import classes from './checkBox.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CheckboxSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Checkbox
    id={id}
    className={`${classes.actionsDefaultBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

CheckboxSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CheckboxSvgMemo = memo(CheckboxSvg, areEqualShallow);
export { CheckboxSvgMemo as CheckboxSvg };
