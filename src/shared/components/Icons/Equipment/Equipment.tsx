import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Equipment from '../../../Assets/equipment-log.svg';

// Custom css
import classes from './equipment.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const EquipmentSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Equipment id={id} className={`${classes.equipmentBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

EquipmentSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const EquipmentSvgMemo = memo(EquipmentSvg, areEqualShallow);
export { EquipmentSvgMemo as EquipmentSvg };
