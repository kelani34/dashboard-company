import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { getPhotoShareBreadCrumb, getPhotoShareAlbum } from 'Utils/helpers';

import classes from './photoShareBreadCrumb.module.css';

interface Props {
  selectedPhoto: any;
  album: boolean;
}

const PhotoShareBreadCrumb = ({ selectedPhoto, album }: Props) => (
  <span>
    {selectedPhoto?.id && (
      <span>
        <span className={classes.breadCrumb}>{getPhotoShareBreadCrumb(selectedPhoto, album)}</span>
        {!album ? <p className={classes.breadCrumbAlbum}>{getPhotoShareAlbum(selectedPhoto)}</p> : ''}
      </span>
    )}
  </span>
);

const PhotoShareBreadCrumbMemo = memo(PhotoShareBreadCrumb, areEqual);

export { PhotoShareBreadCrumbMemo as PhotoShareBreadCrumb };
