import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Thumbnail } from 'Containers/Thumbnail';

import classes from './photo.module.css';

interface Props {
  id: number;
  large: string;
  isLastItem: boolean;
  editable: boolean;
  photosCount: number;
  notesCount: number;
  isBookmarked: boolean;
  isFlagged: boolean;
  isPhotoSelected: boolean;
  onClickThumbnail: (e: any) => void;
  setRefreshOnDelete: (e: any) => void;
}

const Photo = ({
  id,
  large,
  editable,
  onClickThumbnail,
  photosCount,
  notesCount,
  isBookmarked,
  isFlagged,
  isPhotoSelected,
  isLastItem,
  setRefreshOnDelete,
}: Props) => (
  <Thumbnail
    id={id}
    className={classes.photoBase}
    thumbnailSrcUrl={large}
    onClick={onClickThumbnail}
    photosCount={photosCount}
    notesCount={notesCount}
    isBookmarked={isBookmarked}
    isFlagged={isFlagged}
    readonly={!editable}
    isLastItem={isLastItem}
    isPhotoSelected={isPhotoSelected}
    setRefreshOnDelete={setRefreshOnDelete}
  />
);

const PhotoMemo = memo(Photo, areEqual);

export { PhotoMemo as Photo };
