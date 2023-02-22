import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Circle from '../../../Assets/circle.svg';
import Circle16 from '../../../Assets/circle-16.svg';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const CircleSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case '16':
      return <Circle16 id={id} className={className || ''} onClick={onClick} onKeyUp={onKeyUp} />;
    default:
      return <Circle id={id} className={className || ''} onClick={onClick} onKeyUp={onKeyUp} />;
  }
};

CircleSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CircleSvgMemo = memo(CircleSvg, areEqualShallow);
export { CircleSvgMemo as CircleSvg };
