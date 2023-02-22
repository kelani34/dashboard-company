import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Shop from '../../../../Assets/shop.svg';

// Custom css
import classes from './shop.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ShopSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Shop id={id} className={`${classes.shopBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

ShopSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ShopSvgMemo = memo(ShopSvg, areEqualShallow);
export { ShopSvgMemo as ShopSvg };
