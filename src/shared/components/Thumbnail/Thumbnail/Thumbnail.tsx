/*eslint-disable */
import React, { memo, useState, useCallback } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import classes from './thumbnail.module.css';
import { ImagePlaceHolder } from 'Components/ImagePlaceHolder';
import { Icon } from 'Components/Icons';

interface Props {
  id?: number;
  placeHolderClassName?: string;
  imgClassName?: string;
  notesCount?: number;
  isBookmarked?: boolean;
  isFlagged?: boolean;
  thumbnailSrcUrl?: string;
  altString?: string;
  isPhotoSelected?: boolean;
  onClick?: (e: any) => void;
}

const Thumbnail = ({
  id,
  placeHolderClassName,
  imgClassName,
  notesCount,
  isBookmarked,
  isFlagged,
  thumbnailSrcUrl,
  altString = '',
  isPhotoSelected,
  onClick,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const onLoad = useCallback(() => {
    setIsLoaded(!isLoaded);
  }, [isLoaded]);
  return (
    <div className={classes.container}>
      {!isLoaded && <ImagePlaceHolder placeHolderClassName={placeHolderClassName} />}
      <img
        id={id && id.toString()}
        onLoad={onLoad}
        onClick={onClick}
        src={thumbnailSrcUrl}
        alt={altString || 'image'}
        className={`${classes.imgReSizing} ${classes.dimensions} ${classes.pointer}
      ${isLoaded ? classes.visible : classes.hidden}
      ${imgClassName ? imgClassName : ''}
       ${isPhotoSelected ? classes.isPhotoSelected : ''}
      `}
      />
      {notesCount > 0 && <Icon className={classes.photoNote} type="photonote" />}
      <div className={classes.topIcons}>
        {isFlagged && <Icon className={classes.photoFlag} type="photoflag" />}
        {isBookmarked && <Icon className={classes.photoBookmark} type="photobookmark" />}
      </div>
      <div className={classes.bottomIcons}>
        {isPhotoSelected && <Icon className={classes.photoBookmark} type="confirmpurple" />}
      </div>
    </div>
  );

  /*
  return !isLoaded ? (
    <div
      className={`d-flex align-items-center justify-content-center ${classes.dimensions} ${classes.pointer} ${
        classes.loadingImageBackground
      } ${placeHolderClassName ? placeHolderClassName : ""}`}
    >
      <div className={`${classes.placeHolderText}`}>thumbnail loading</div>
    </div>
  ) : (
    <img
      onLoad={onLoad}
      onClick={onClick}
      src={thumbnailSrcUrl}
      alt={altString || "image"}
      className={`${classes.imgReSizing} ${classes.dimensions} ${classes.pointer}
      ${isLoaded ? classes.visible : classes.hidden}
      ${imgClassName ? imgClassName : ""}`}
    />
  );
  */
};
Thumbnail.defaultProps = {
  placeHolderClassName: undefined,
  imgClassName: undefined,
  onClick: undefined,
  altString: undefined,
  thumbnailSrcUrl: undefined,
  isPhotoSelected: false,
};
const ThumbnailMemo = memo(Thumbnail, areEqual);
export { ThumbnailMemo as Thumbnail };
