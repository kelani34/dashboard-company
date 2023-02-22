import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import MobileApp from '../../../Assets/mobile-app-icon.svg';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const MobileAppSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <MobileApp id={id} className={`${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

MobileAppSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const MobileAppSvgMemo = memo(MobileAppSvg, areEqualShallow);
export { MobileAppSvgMemo as MobileAppSvg };
