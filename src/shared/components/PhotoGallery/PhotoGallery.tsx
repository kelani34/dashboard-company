import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Dropzone } from 'Containers/DropZone';
import { Thumbnail } from 'Containers/Thumbnail';
import { Spinner } from 'Components/Spinner';
import classes from './photogallery.module.css';

interface Props {
  title: string;
  roomId: number;
  albumId?: number;
  fileUploading?: boolean;
  hide?: boolean;
  photosCount?: number;
  imageList: any[];
  setImageList?: (imgPath: object) => void;
  onClickThumbnail: (e: any) => void;
  onClickLastThumbnail?: (e: any) => void;
}

const PhotoGallery = ({
  title = 'Kitchen',
  roomId,
  albumId,
  fileUploading,
  hide,
  photosCount,
  imageList,
  setImageList,
  onClickThumbnail,
  onClickLastThumbnail,
}: Props) => (
  <div className={`container-fluid p-0 w-100 position-relative ${classes.container} ${hide ? 'd-none' : 'd-block'}`}>
    {fileUploading && <Spinner loading />}
    <div className="row  mb-2">
      <div className="col-12">
        <span className={classes.title}>{title}</span>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <div
          className={`d-flex ${classes.dropZoneContainer} ${classes.flexCenterVertical} ${
            fileUploading ? classes.opacity : ''
          }`}
        >
          <div className={`d-flex flex-wrap ${classes.thumbNailGroup}`}>
            {imageList &&
              imageList.map(({ id, thumbnailSrcUrl, irSrcUrl, rawSrcUrl }: any, index: number) => (
                <Thumbnail
                  id={id}
                  key={thumbnailSrcUrl}
                  thumbnailSrcUrl={thumbnailSrcUrl}
                  irSrcUrl={irSrcUrl}
                  onClick={
                    index + 1 === imageList.length && photosCount !== 0 ? onClickLastThumbnail : onClickThumbnail
                  }
                  photosCount={photosCount}
                  isLastItem={index + 1 === imageList.length}
                  rawSrcUrl={rawSrcUrl}
                  readonly={index + 1 === imageList.length && photosCount !== 0}
                />
              ))}
          </div>
          <Dropzone roomId={roomId} albumId={albumId} setImageList={setImageList} hasImages={imageList.length > 0} />
        </div>
      </div>
    </div>
  </div>
);

PhotoGallery.defaultProps = {
  hide: false,
  photosCount: 0,
  fileUploading: false,
  albumId: undefined,
  setImageList: undefined,
  onClickLastThumbnail: undefined,
};

const PhotoGalleryMemo = memo(PhotoGallery, areEqual);
export { PhotoGalleryMemo as PhotoGallery };
