import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Link from '../../../Assets/link.svg';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const LinkSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Link id={id} className={`${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

LinkSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const LinkSvgMemo = memo(LinkSvg, areEqualShallow);
export { LinkSvgMemo as LinkSvg };
