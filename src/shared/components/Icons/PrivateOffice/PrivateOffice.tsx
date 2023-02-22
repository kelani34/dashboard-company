import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import PrivateOffice from '../../../Assets/private-office.svg';

// Custom css
import classes from './privateOffice.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const PrivateOfficeSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <PrivateOffice
    id={id}
    className={`${classes.privateOfficeBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

PrivateOfficeSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const PrivateOfficeSvgMemo = memo(PrivateOfficeSvg, areEqualShallow);
export { PrivateOfficeSvgMemo as PrivateOfficeSvg };
