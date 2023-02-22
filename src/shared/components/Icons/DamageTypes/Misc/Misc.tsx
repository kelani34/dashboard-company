import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Misc from '../../../../Assets/misc.svg';

// Custom css
import classes from './misc.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const MiscSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Misc id={id} className={`${classes.miscBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

MiscSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const MiscSvgMemo = memo(MiscSvg, areEqualShallow);
export { MiscSvgMemo as MiscSvg };
