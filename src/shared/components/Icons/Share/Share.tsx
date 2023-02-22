import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Share32 from '../../../Assets/share-32.svg';
import Share from '../../../Assets/share.svg';

import classes from './share.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const ShareSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case '32':
      return (
        <Share32 id={id} className={`${classes.shareBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    default:
      return (
        <Share id={id} className={`${classes.shareBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
  }
};
ShareSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ShareSvgMemo = memo(ShareSvg, areEqualShallow);
export { ShareSvgMemo as ShareSvg };
