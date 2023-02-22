import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Thumbnail } from 'Containers/Thumbnail';

import classes from './selectedPhoto.module.css';

interface Props {
  id: number;
  large: string;
  isLastItem: boolean;
  photosCount: number;
}

const SelectedPhoto = ({ id, large, photosCount, isLastItem }: Props) => (
  <Thumbnail
    readonly
    id={id}
    className={classes.photoBase}
    thumbnailSrcUrl={large}
    photosCount={photosCount}
    isLastItem={isLastItem}
  />
);

const SelectedPhotoMemo = memo(SelectedPhoto, areEqual);

export { SelectedPhotoMemo as SelectedPhoto };
