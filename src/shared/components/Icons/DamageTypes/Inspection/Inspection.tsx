import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Inspection from '../../../../Assets/inspection.svg';

// Custom css
import classes from './inspection.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const InspectionSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Inspection id={id} className={`${classes.inspectionBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

InspectionSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const InspectionSvgMemo = memo(InspectionSvg, areEqualShallow);
export { InspectionSvgMemo as InspectionSvg };
