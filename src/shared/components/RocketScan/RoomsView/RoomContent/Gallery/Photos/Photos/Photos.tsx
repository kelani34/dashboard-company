import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Photo } from 'Containers/RocketScan';

import classes from './photos.module.css';

interface Props {
  photos: any[];
  photosCount: number;
  editable: boolean;
  fetching: boolean;
  onClickLastThumbnail: (e: any) => void;
  setRefreshOnDelete: (e: any) => void;
}

const Photos = ({ photos, fetching, photosCount, editable, onClickLastThumbnail, setRefreshOnDelete }: Props) => (
  <div className={`d-block flex-nowrap d-md-flex flex-md-wrap ${classes.flexCenterVertical}`}>
    {photos.length > 0 &&
      photos.map((photo: any, index: number) => (
        <Photo
          key={photo.id}
          photo={photo}
          fetching={fetching}
          editable={editable}
          isLastItem={index + 1 === photos.length}
          photosCount={photosCount}
          onClickLastThumbnail={onClickLastThumbnail}
          setRefreshOnDelete={setRefreshOnDelete}
        />
      ))}
  </div>
);

const PhotosMemo = memo(Photos, areEqual);

export { PhotosMemo as Photos };
