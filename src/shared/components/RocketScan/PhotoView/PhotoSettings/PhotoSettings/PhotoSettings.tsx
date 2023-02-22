import React, { memo } from 'react';

import { Icon } from 'Components/Icons';
import { Button } from 'Components/Button';
import { ImageDeleteModal } from 'Containers/ImageDeleteModal';
import { areEqual } from 'Utils/equalityChecks';

import { PhotoNotes } from 'Containers/RocketScan';
import classes from './photoSettings.module.css';

interface Props {
  isOpenDeletePhotoModal: boolean;
  selectedPhoto: any;
  photoBookmarked: boolean;
  photoFlagged: boolean;
  onClickCloseDeletePhotoModal: (e: any) => void;
  onClickDeletePhotoButton: (e: any) => void;
  onClickBookmarkPhotoButton: (e: any) => void;
  onClickFlagPhotoButton: (e: any) => void;
}

const PhotoSettings = ({
  isOpenDeletePhotoModal,
  onClickDeletePhotoButton,
  selectedPhoto,
  photoBookmarked,
  photoFlagged,
  onClickCloseDeletePhotoModal,
  onClickBookmarkPhotoButton,
  onClickFlagPhotoButton,
}: Props) => (
  <div className={`${classes.photoSettings}`}>
    <div className={`${classes.photoSettingsHeader}`}>
      <div className={classes.colouredButtonsWrapper}>
        {/* <Button type="button" className={classes.optionsButton}> */}
        {/*  <div className={classes.optionsIconWrapper}> */}
        {/*    <Icon type="threedots" /> */}
        {/*  </div> */}
        {/*  <span>Options</span> */}
        {/* </Button> */}
        <Button type="button" className={classes.deleteButton} onClick={onClickDeletePhotoButton}>
          <Icon type="trashphoto" />
          <p>Delete</p>
        </Button>
        <Button type="button" className={classes.bookmarkButton} onClick={onClickBookmarkPhotoButton}>
          <Icon type={photoBookmarked ? 'bookmarkedphoto' : 'bookmarkphoto'} />
          <p>Bookmark</p>
        </Button>
        <Button type="button" className={classes.flagButton} onClick={onClickFlagPhotoButton}>
          <Icon type={photoFlagged ? 'flaggedphoto' : 'flagphoto'} />
          <p>Flag</p>
        </Button>
      </div>
    </div>

    <PhotoNotes selectedPhoto={selectedPhoto} />

    <ImageDeleteModal
      isOpen={isOpenDeletePhotoModal}
      modalCloseClick={onClickCloseDeletePhotoModal}
      id={selectedPhoto?.id}
    />
  </div>
);

const PhotoSettingsMemo = memo(PhotoSettings, areEqual);

export { PhotoSettingsMemo as PhotoSettings };
