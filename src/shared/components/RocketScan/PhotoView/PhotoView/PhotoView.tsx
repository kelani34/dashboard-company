import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';

import { PhotoShareBreadCrumb } from 'Components/PhotoShare/PhotoShareBreadCrumb';
import { Carousel, PhotoSettings } from 'Containers/RocketScan';

import classes from './photoView.module.css';

interface Props {
  selectedPhoto: any;
  photoUploadedDate: string;
  photoUploadedBy: string;
  onClickBack: (e: any) => void;
}

const PhotoView = ({ selectedPhoto, photoUploadedDate, photoUploadedBy, onClickBack }: Props) => (
  <div className={`container-fluid p-0 ${classes.photoViewWrapper}`}>
    <div className="row p-0 m-0">
      <div className="col-9 p-0">
        <div className={`position-relative ${classes.carousel}`}>
          <div className={`d-flex justify-content-between align-items-center w-100 ${classes.carouselHeader}`}>
            <Button className={classes.backArrow} onClick={onClickBack}>
              <Icon type="arrowleft" />
              <span> Back to Room</span>
            </Button>
            <div className={`${classes.photoBreadCrumb}`}>
              <PhotoShareBreadCrumb selectedPhoto={selectedPhoto} album />
            </div>
          </div>
          <Carousel />
          <div className={classes.photoMetaData}>
            <span>
              {'Uploaded: '}
              {photoUploadedDate}
            </span>
            <span>
              {'Uploaded By: '}
              {photoUploadedBy}
            </span>
          </div>
        </div>
      </div>
      <div className="col-3 p-0">
        <PhotoSettings />
      </div>
    </div>
  </div>
);

const PhotoViewMemo = memo(PhotoView, areEqual);

export { PhotoViewMemo as PhotoView };
