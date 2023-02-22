import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Dropzone } from 'Containers/RocketScan';
import { Spinner } from 'Components/Spinner';
import { Photos } from 'Components/RocketScan';

import classes from './gallery.module.css';

interface Props {
  title: string;
  roomId: number;
  albumId: number;
  fetching: boolean;
  hide?: boolean;
  photosCount: number;
  photos: any[];
  editable: boolean;
  onClickLastThumbnail: (e: any) => void;
  setRefreshOnDelete: (e: any) => void;
}

const Gallery = React.forwardRef(
  (
    {
      title = 'Kitchen',
      roomId,
      albumId,
      fetching,
      hide,
      photosCount,
      photos,
      editable,
      onClickLastThumbnail,
      setRefreshOnDelete,
    }: Props,
    galleryRef: any
  ) => (
    <div
      className={`container-fluid w-100 position-relative ${classes.container} ${hide ? 'd-none' : 'd-block'}`}
      ref={(ref) => {
        galleryRef.current = ref;
      }}
    >
      {fetching && <Spinner loading />}
      <div className="row  mb-2">
        <div className="col-12">
          <span className={classes.title}>{title}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className={`d-flex ${classes.flexCenterVertical} ${fetching ? classes.opacity : ''}`}>
            <div className="d-flex flex-wrap w-100">
              <Photos
                photos={photos}
                photosCount={photosCount}
                editable={editable}
                fetching={fetching}
                onClickLastThumbnail={onClickLastThumbnail}
                setRefreshOnDelete={setRefreshOnDelete}
              />
            </div>

            <Dropzone
              roomId={roomId}
              albumId={albumId}
              hasImages={photos.length > 0}
              editable={editable || photos.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  )
);

Gallery.defaultProps = {
  hide: false,
};

const GalleryMemo = memo(Gallery, areEqual);
export { GalleryMemo as Gallery };
