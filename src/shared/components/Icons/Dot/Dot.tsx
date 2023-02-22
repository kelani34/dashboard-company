import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Dot from '../../../Assets/dot.svg';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const DotSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Dot id={id} className={className || ''} onClick={onClick} onKeyUp={onKeyUp} />
);

DotSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const DotSvgMemo = memo(DotSvg, areEqualShallow);
export { DotSvgMemo as DotSvg };
