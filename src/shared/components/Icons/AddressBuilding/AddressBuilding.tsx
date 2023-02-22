import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import AddressBuilding from '../../../Assets/addressBuilding.svg';

// Custom css
import classes from './addressBuilding.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const AddressBuildingSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <AddressBuilding
    id={id}
    className={`${classes.addressBuildingBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

AddressBuildingSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const AddressBuildingSvgMemo = memo(AddressBuildingSvg, areEqualShallow);
export { AddressBuildingSvgMemo as AddressBuildingSvg };
