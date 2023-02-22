import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import SideBarLeftArrow from '../../../Assets/side-bar-left-arrow.svg';

// Custom css
import classes from './sideBarLeftArrow.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const SideBarLeftArrowSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <SideBarLeftArrow
    id={id}
    className={`${classes.sideBarArrowBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

SideBarLeftArrowSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onKeyUp: undefined,
};

const SideBarLeftArrowSvgMemo = memo(SideBarLeftArrowSvg, areEqualShallow);
export { SideBarLeftArrowSvgMemo as SideBarLeftArrowSvg };
