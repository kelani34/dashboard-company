import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import PhotoBookmark from '../../../Assets/photo-bookmark.svg';

// Custom css
import classes from './photoBookmark.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const PhotoBookmarkSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <PhotoBookmark
    id={id}
    className={`${classes.photoBookmarkBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

PhotoBookmarkSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const PhotoBookmarkSvgMemo = memo(PhotoBookmarkSvg, areEqualShallow);
export { PhotoBookmarkSvgMemo as PhotoBookmarkSvg };
