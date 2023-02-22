import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import HamburgerMenu from '../../../Assets/hamburger-menu.svg';

// Custom css
import classes from './hamburgerMenu.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const HamburgerMenuSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <HamburgerMenu
    id={id}
    className={`${classes.hamburgerMenuBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

HamburgerMenuSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const HamburgerMenuSvgMemo = memo(HamburgerMenuSvg, areEqualShallow);
export { HamburgerMenuSvgMemo as HamburgerMenuSvg };
