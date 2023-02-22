import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Office from '../../../Assets/office-building.svg';

// Custom css
import classes from './officeBuilding.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const OfficeBuildingSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Office id={id} className={`${classes.OfficeBuildingBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

OfficeBuildingSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const OfficeBuildingSvgMemo = memo(OfficeBuildingSvg, areEqualShallow);
export { OfficeBuildingSvgMemo as OfficeBuildingSvg };
