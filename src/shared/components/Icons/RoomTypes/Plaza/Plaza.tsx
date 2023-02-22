import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Plaza from '../../../../Assets/plaza.svg';

// Custom css
import classes from './plaza.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const PlazaSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Plaza id={id} className={`${classes.plazaBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

PlazaSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const PlazaSvgMemo = memo(PlazaSvg, areEqualShallow);
export { PlazaSvgMemo as PlazaSvg };
