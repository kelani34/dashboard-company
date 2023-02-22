import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Thumbnail, ThumbOverlay } from 'Components/Thumbnail';
import { Icon } from 'Components/Icons';
import { areEqual } from 'Utils/equalityChecks';
import classes from 'Containers/Thumbnail/thumbnail.module.css';
import { deletePhoto } from '.';

interface Props {
  id?: number;
  readonly?: boolean;
  isLastItem?: boolean;
  photosCount?: number;
  notesCount?: number;
  isBookmarked?: boolean;
  isFlagged?: boolean;
  className?: string;
  thumbnailSrcUrl?: string;
  irSrcUrl?: string;
  rawSrcUrl?: string;
  isPhotoSelected?: boolean;
  onClick?: (e: any) => void;
  setRefreshOnDelete?: (e: any) => void;
}
// TODO:: to be refactor
const ThumbnailContainer = ({
  id,
  readonly,
  isLastItem,
  photosCount,
  notesCount,
  isBookmarked,
  isFlagged,
  className,
  thumbnailSrcUrl,
  irSrcUrl,
  isPhotoSelected,
  onClick,
  setRefreshOnDelete,
  rawSrcUrl,
}: Props) => {
  const dispatch = useDispatch();
  const onThumbnailClick = () => {
    if (onClick) {
      onClick({
        regular: rawSrcUrl,
        ir: irSrcUrl,
        id,
      });
    }
  };

  // Delete the photo based on the id
  const onIconClick = useCallback((e: any) => {
    e.preventDefault();

    dispatch(deletePhoto(id, setRefreshOnDelete));
  }, []);

  return (
    <div className={classes.thumbnailWrapper}>
      <Thumbnail
        imgClassName={className}
        notesCount={notesCount}
        isBookmarked={isBookmarked}
        isFlagged={isFlagged}
        isPhotoSelected={isPhotoSelected}
        thumbnailSrcUrl={thumbnailSrcUrl}
        onClick={id ? onThumbnailClick : null}
      />
      {isLastItem && photosCount !== 0 && (
        <div
          className={classes.overlay}
          onClick={onThumbnailClick}
          onKeyUp={onThumbnailClick}
          role="button"
          tabIndex={0}
        >
          <ThumbOverlay text={`+${photosCount}`} />
        </div>
      )}
      {!readonly && id && <Icon type="closecircle" className={classes.deleteImageIcon} onClick={onIconClick} />}
    </div>
  );
};

ThumbnailContainer.defaultProps = {
  id: undefined,
  thumbnailSrcUrl: undefined,
  irSrcUrl: undefined,
  readonly: undefined,
  isLastItem: false,
  photosCount: 0,
  notesCount: 0,
  isBookmarked: undefined,
  isFlagged: undefined,
  className: undefined,
  onClick: undefined,
  setRefreshOnDelete: undefined,
  rawSrcUrl: undefined,
  isPhotoSelected: false,
};
const ThumbnailContainerMemo = memo(ThumbnailContainer, areEqual);

export { ThumbnailContainerMemo as Thumbnail };
