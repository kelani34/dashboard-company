import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import LinkOpen from '../../../Assets/link-open.svg';

import classes from './linkOpen.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const LinkOpenSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <LinkOpen id={id} className={`${classes.linkOpenBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

LinkOpenSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const LinkOpenSvgMemo = memo(LinkOpenSvg, areEqualShallow);
export { LinkOpenSvgMemo as LinkOpenSvg };
