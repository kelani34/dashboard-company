import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import PhotoBookmark from '../../../Assets/photo-flag.svg';

// Custom css
import classes from './photoFlag.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const PhotoFlagSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <PhotoBookmark
    id={id}
    className={`${classes.photoFlagBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

PhotoFlagSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const PhotoFlagSvgMemo = memo(PhotoFlagSvg, areEqualShallow);
export { PhotoFlagSvgMemo as PhotoFlagSvg };
