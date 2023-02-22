import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Flag from '../../../Assets/flag.svg';
import FlagPurple from '../../../Assets/flag-purple.svg';
import FlagPhoto from '../../../Assets/flag-photo.svg';
import FlaggedPhoto from '../../../Assets/flagged-photo.svg';
import FlagOutlinePurple from '../../../Assets/flag-outline-purple.svg';
// Custom css
import classes from './flag.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const FlagSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case 'flagPhoto':
      return (
        <FlagPhoto id={id} className={`${classes.flagBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    case 'flaggedPhoto':
      return (
        <FlaggedPhoto
          id={id}
          className={`${classes.flagBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );

    case 'purple':
      return (
        <FlagPurple id={id} className={`${classes.flagBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    case 'outlinepurple':
      return (
        <FlagOutlinePurple
          id={id}
          className={`${classes.flagBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return <Flag id={id} className={`${classes.flagBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />;
  }
};

FlagSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: 'default',
  onClick: undefined,
  onKeyUp: undefined,
};

const FlagSvgMemo = memo(FlagSvg, areEqualShallow);
export { FlagSvgMemo as FlagSvg };
