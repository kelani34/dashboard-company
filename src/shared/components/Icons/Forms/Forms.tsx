import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';

import Form from '../../../Assets/forms.svg';

// Custom css
import classes from './form.module.css';

interface Props {
  className?: string;
  fill: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const FormSvg = ({ className = '', fill = '#5B476B', id, onClick, onKeyUp }: Props) => (
  <Form
    id={id}
    className={`${classes.logoIconBase} ${className || ''}`}
    fill={fill}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

FormSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const FormSvgMemo = memo(FormSvg, areEqualShallow);
export { FormSvgMemo as FormSvg };
