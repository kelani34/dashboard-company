import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';

import { PhotoViewCarousel } from 'Containers/PhotoViewCarousel';
import { ImageNotes } from 'Containers/PhotoView';
import classes from './photoView.module.css';

interface Props {
  imageId: number;
  notes?: any[];
  isOpen: boolean;
  onClickBack: (e: any) => void;
  modalCloseClick: (e: any) => void;
  setModalStatus: (e: any) => void;
}

const PhotoView = ({ imageId, notes, isOpen, onClickBack, modalCloseClick, setModalStatus }: Props) => (
  <div className="container-fluid d-flex justify-content-between align-items-center p-0">
    <div
      className={`col-9 d-flex justify-content-evenly align-items-center position-relative h-100
      ${classes.imageColumn}`}
    >
      <Button className={classes.backArrow} onClick={onClickBack}>
        <Icon type="arrowleft" />
        <span> Back to room</span>
      </Button>

      <PhotoViewCarousel />
    </div>
    <div className={`col-3 align-self-start px-3 pt-3 ${classes.notesColumn}`}>
      <ImageNotes
        notes={notes}
        isOpen={isOpen}
        modalCloseClick={modalCloseClick}
        imageId={imageId}
        setModalStatus={setModalStatus}
      />
    </div>
  </div>
);
PhotoView.defaultProps = {
  notes: [],
};
const PhotoViewMemo = memo(PhotoView, areEqual);

export { PhotoViewMemo as PhotoView };
