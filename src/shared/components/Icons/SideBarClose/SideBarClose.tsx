import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import SideBarClose from '../../../Assets/side-bar-close.svg';

// Custom css
import classes from './sideBarClose.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const SideBarCloseSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <SideBarClose id={id} className={`${classes.closeBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

SideBarCloseSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const SideBarCloseSvgMemo = memo(SideBarCloseSvg, areEqualShallow);
export { SideBarCloseSvgMemo as SideBarCloseSvg };
