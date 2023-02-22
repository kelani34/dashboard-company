import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Bookmark from '../../../Assets/bookmark.svg';
import BookmarkPurple from '../../../Assets/bookmark-purple.svg';
import BookmarkPhoto from '../../../Assets/bookmark-photo.svg';
import BookmarkedPhoto from '../../../Assets/bookmarked-photo.svg';
import BookmarkOutlinePurple from '../../../Assets/bookmark-outline-purple.svg';
// Custom css
import classes from './bookmark.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const BookmarkSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case 'bookmarkPhoto':
      return (
        <BookmarkPhoto
          id={id}
          className={`${classes.iconBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    case 'bookmarkedPhoto':
      return (
        <BookmarkedPhoto
          id={id}
          className={`${classes.iconBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    case 'purple':
      return (
        <BookmarkPurple
          id={id}
          className={`${classes.iconBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    case 'outlinepurple':
      return (
        <BookmarkOutlinePurple
          id={id}
          className={`${classes.iconBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <Bookmark id={id} className={`${classes.iconBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
  }
};

BookmarkSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: 'default',
  onClick: undefined,
  onKeyUp: undefined,
};

const BookmarkSvgMemo = memo(BookmarkSvg, areEqualShallow);
export { BookmarkSvgMemo as BookmarkSvg };
