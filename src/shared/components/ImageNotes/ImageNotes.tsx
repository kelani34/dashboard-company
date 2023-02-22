import React, { memo } from 'react';

import { Icon } from 'Components/Icons';
import { Button } from 'Components/Button';
import { ImageDeleteModal } from 'Containers/ImageDeleteModal';
import { areEqual } from 'Utils/equalityChecks';
import { PhotoShareBreadCrumb } from 'Components/PhotoShare/PhotoShareBreadCrumb';

import { NoteItem } from './NoteItem/NoteItem';

import classes from './imageNotes.module.css';

type NoteItems = {
  // eslint-disable-next-line
  id: number;
  // eslint-disable-next-line
  content: string;
};

interface Props {
  noteItems: Array<NoteItems>;
  isOpen?: boolean;
  readonly?: boolean;
  imageId?: number;
  selectedPhoto: any;
  modalCloseClick?: (e: any) => void;
  openModal?: (e: any) => void;
}

const ImageNotes = ({
  noteItems,
  isOpen,
  readonly = false,
  openModal,
  imageId,
  selectedPhoto,
  modalCloseClick,
}: Props) => (
  <div className={`${classes.notesWrapper}`}>
    {!readonly && (
      <div className={`${classes.notesHeader}`}>
        <div className={classes.colouredButtonsWrapper}>
          <Button type="button" className={classes.optionsButton}>
            <div className={classes.optionsIconWrapper}>
              <Icon type="threedots" />
            </div>
            <span>Options</span>
          </Button>
          <Button type="button" className={classes.deleteButton} onClick={openModal}>
            <Icon type="trash" />
            <span>Delete</span>
          </Button>
        </div>
      </div>
    )}
    <div className={`w-100 d-block ${classes.breadCrumb}`}>
      <PhotoShareBreadCrumb selectedPhoto={selectedPhoto} album />
    </div>
    {noteItems.length > 0 && (
      <ul className="nav flex-column mb-auto">
        {noteItems.map((noteItem: NoteItems) => (
          <NoteItem key={noteItem.id} id={noteItem.id} content={noteItem.content} />
        ))}
      </ul>
    )}
    {!readonly && <ImageDeleteModal isOpen={isOpen} modalCloseClick={modalCloseClick} id={imageId} />}
  </div>
);

ImageNotes.defaultProps = {
  isOpen: false,
  readonly: undefined,
  imageId: undefined,
  modalCloseClick: undefined,
  openModal: undefined,
};

const ImageNotesMemo = memo(ImageNotes, areEqual);

export { ImageNotesMemo as ImageNotes };
