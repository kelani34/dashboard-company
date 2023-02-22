import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Reception from '../../../Assets/reception.svg';

// Custom css
import classes from './reception.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ReceptionSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Reception id={id} className={`${classes.receptionBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

ReceptionSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ReceptionSvgMemo = memo(ReceptionSvg, areEqualShallow);
export { ReceptionSvgMemo as ReceptionSvg };
