import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';

import Download from '../../../Assets/download.svg';
import DownloadPurple from '../../../Assets/download-purple.svg';

// Custom css
import classes from './download.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const DownloadSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case 'purple':
      return (
        <DownloadPurple
          id={id}
          className={`${classes.iconBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <Download id={id} className={`${classes.iconBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
  }
};

DownloadSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const DownloadSvgMemo = memo(DownloadSvg, areEqualShallow);
export { DownloadSvgMemo as DownloadSvg };
