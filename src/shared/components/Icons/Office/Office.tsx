import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Office from '../../../Assets/office.svg';

// Custom css
import classes from './office.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const OfficeSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Office id={id} className={`${classes.OfficeBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

OfficeSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const OfficeSvgMemo = memo(OfficeSvg, areEqualShallow);
export { OfficeSvgMemo as OfficeSvg };
