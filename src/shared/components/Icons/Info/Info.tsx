import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Info from '../../../Assets/info.svg';

// Custom css
import classes from './info.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const InfoSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Info id={id} className={`${classes.iconBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

InfoSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const InfoSvgMemo = memo(InfoSvg, areEqualShallow);
export { InfoSvgMemo as InfoSvg };
