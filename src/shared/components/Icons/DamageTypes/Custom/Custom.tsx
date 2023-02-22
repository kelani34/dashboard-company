import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Custom from '../../../../Assets/custom-damage-type.svg';

// Custom css
import classes from './custom.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CustomSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Custom id={id} className={`${classes.customBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

CustomSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CustomSvgMemo = memo(CustomSvg, areEqualShallow);
export { CustomSvgMemo as CustomSvg };
