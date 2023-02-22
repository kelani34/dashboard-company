import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import EmployeePhone from '../../../Assets/employee-phone.svg';

// Custom css
import classes from './employeePhone.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const EmployeePhoneSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <EmployeePhone
    id={id}
    className={`${classes.employeePhoneBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

EmployeePhoneSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const EmployeePhoneSvgMemo = memo(EmployeePhoneSvg, areEqualShallow);
export { EmployeePhoneSvgMemo as EmployeePhoneSvg };
