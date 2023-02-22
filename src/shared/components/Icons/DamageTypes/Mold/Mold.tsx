import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Mold from '../../../../Assets/mold.svg';

// Custom css
import classes from './mold.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const MoldSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Mold id={id} className={`${classes.moldBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

MoldSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const MoldSvgMemo = memo(MoldSvg, areEqualShallow);
export { MoldSvgMemo as MoldSvg };
