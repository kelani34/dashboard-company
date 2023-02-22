import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Custom from '../../../../Assets/custom-damage-add.svg';

// Custom css
import classes from './addCustom.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const AddCustomSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Custom id={id} className={`${classes.customBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

AddCustomSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const AddCustomSvgMemo = memo(AddCustomSvg, areEqualShallow);
export { AddCustomSvgMemo as AddCustomSvg };
