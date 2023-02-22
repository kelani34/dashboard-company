import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Photos } from 'Components/PhotoShare/PhotoShareGallery';

import classes from './album.module.css';

interface Props {
  name: string;
  photos: any[];
  hide: boolean;
  photosCount: number;
  onClickLastThumbnail: (e: any) => void;
}

const Album = ({ name, photos, hide, photosCount, onClickLastThumbnail }: Props) => (
  <div className={hide ? 'd-none' : 'd-block'}>
    <h3 className={classes.albumTitle}>{name}</h3>
    <div>
      <Photos photos={photos} photosCount={photosCount} onClickLastThumbnail={onClickLastThumbnail} />
    </div>
  </div>
);

const AlbumMemo = memo(Album, areEqual);

export { AlbumMemo as Album };
