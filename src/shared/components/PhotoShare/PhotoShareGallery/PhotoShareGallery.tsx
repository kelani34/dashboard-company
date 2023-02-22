import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';

import { PhotoShareCarousel } from 'Containers/Public/PhotoShare';
import { Header } from 'Components/PhotoShare/Header';
import { PhotoShareNotes } from '../PhotoShareNotes';
import { PhotoShareBreadCrumb } from '../PhotoShareBreadCrumb';

import classes from './photoShareGallery.module.css';

interface Props {
  projectUid: string;
  location?: string;
  selectedPhoto: any;
  onClickBack: (e: any) => void;
}

const PhotoShareGallery = ({ projectUid, location, onClickBack, selectedPhoto }: Props) => (
  <div className="container-fluid d-md-flex justify-start p-0">
    <div className={`col-sm-12 col-md-9 ${classes.bodyColumn}`}>
      <div className={classes.mobileHeader}>
        <Header id={projectUid} location={location} date="" />
      </div>
      <div className={classes.breadCrumb}>
        <Button className={classes.breadCrumbArrow} onClick={onClickBack}>
          <Icon type="arrowleft" />
          <span className={classes.breadCrumbText}>
            <PhotoShareBreadCrumb selectedPhoto={selectedPhoto} album={false} />
          </span>
        </Button>
      </div>
      <div
        className={`d-flex flex-grow-1 justify-content-evenly align-items-center position-relative
        ${classes.imageColumn}`}
      >
        <Button className={classes.backArrow} onClick={onClickBack}>
          <Icon type="arrowleft" />
          <span> Back to project</span>
        </Button>
        <PhotoShareCarousel />
      </div>
    </div>
    <div className={`col-sm-12 col-md-3 align-self-start ${classes.notesColumn}`}>
      <PhotoShareNotes notes={selectedPhoto?.notes} />
    </div>
  </div>
);

PhotoShareGallery.defaultProps = {
  location: undefined,
};

const PhotoShareGalleryMemo = memo(PhotoShareGallery, areEqual);

export { PhotoShareGalleryMemo as PhotoShareGallery };
