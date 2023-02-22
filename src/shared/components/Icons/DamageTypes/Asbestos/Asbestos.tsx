import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Asbestos from '../../../../Assets/asbestos.svg';

// Custom css
import classes from './asbestos.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const AsbestosSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Asbestos id={id} className={`${classes.asbestosBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

AsbestosSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const AsbestosSvgMemo = memo(AsbestosSvg, areEqualShallow);
export { AsbestosSvgMemo as AsbestosSvg };
