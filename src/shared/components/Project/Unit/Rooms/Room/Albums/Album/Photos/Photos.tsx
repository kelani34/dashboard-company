import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Photo } from 'Containers/Project/Unit/Rooms/Room/Albums/Album/Photos/Photo';

import classes from './photos.module.css';

interface Props {
  photos: any[];
  photosCount: number;
  onClickLastThumbnail: (e: any) => void;
}

const Photos = ({ photos, photosCount, onClickLastThumbnail }: Props) => (
  <div className={`d-block flex-nowrap d-md-flex flex-md-wrap ${classes.flexCenterVertical}`}>
    {photos.length > 0 &&
      photos.map((photo: any, index: number) => (
        <Photo
          key={photo.id}
          photo={photo}
          isLastItem={index + 1 === photos.length}
          photosCount={photosCount}
          onClickLastThumbnail={onClickLastThumbnail}
        />
      ))}
  </div>
);

const PhotosMemo = memo(Photos, areEqual);

export { PhotosMemo as Photos };
