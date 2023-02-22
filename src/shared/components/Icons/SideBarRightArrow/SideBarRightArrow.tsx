import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import SideBarRightArrow from '../../../Assets/side-bar-right-arrow.svg';

// Custom css
import classes from './sideBarRightArrow.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const SideBarRightArrowSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <SideBarRightArrow
    id={id}
    className={`${classes.sideBarArrowBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

SideBarRightArrowSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const SideBarRightArrowSvgMemo = memo(SideBarRightArrowSvg, areEqualShallow);
export { SideBarRightArrowSvgMemo as SideBarRightArrowSvg };
