import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Thumbnail } from 'Containers/Thumbnail';

import classes from './photo.module.css';

interface Props {
  id: number;
  large: string;
  isLastItem: boolean;
  photosCount: number;
  onClickThumbnail: (e: any) => void;
}

const Photo = ({ id, large, onClickThumbnail, photosCount, isLastItem }: Props) => (
  <Thumbnail
    readonly
    id={id}
    className={classes.photoBase}
    thumbnailSrcUrl={large}
    onClick={onClickThumbnail}
    photosCount={photosCount}
    isLastItem={isLastItem}
  />
);

const PhotoMemo = memo(Photo, areEqual);

export { PhotoMemo as Photo };
