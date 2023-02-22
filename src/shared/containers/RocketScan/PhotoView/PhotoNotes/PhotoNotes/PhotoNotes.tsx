import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';

import { CreateNoteForm, NotesToast, NoteItems } from 'Components/Notes';

import { photoNoteEditedSelector } from 'Containers/Notes/selectors';
import { PHOTO_NOTE_EDITED, setNoteEditedGeneral } from 'Containers/Notes/actions';
import { fetchingPhotosSelector } from 'Containers/RocketScan/PhotoView/Carousel/selectors';
import { Spinner } from 'Components/Spinner';
import { UserModel } from 'Containers/User/Models/UserModel';
import { useUser } from 'Context/User';
import { isCompanyAdmin } from 'Utils/roles';
import { useNotesFunctions } from 'Context/Notes';
import { createPhotoNote, listPhotoNotes, setPhotoNoteCreated } from '../actions';
import {
  bodyErrorSelector,
  fetchingPhotoNoteSelector,
  photoNoteCreatedSelector,
  photoNotesSelector,
} from '../selectors';

import classes from './photoNotes.module.css';

interface Props {
  selectedPhoto: PhotoModal;
}

const PhotoNotesContainer = ({ selectedPhoto }: Props) => {
  const dispatch = useDispatch();

  const user: UserModel = useUser();

  const [newNoteText, setNewNoteText] = useState('');
  const [isReadOnly] = useState(isCompanyAdmin(user?.roles));
  const [disablePostButton, setDisablePostButton] = useState(false);

  // get note delete related functions
  const { noteDeleted, setNoteId, setIsOpenDeleteNoteModal, setNoteDeleted }: any = useNotesFunctions();

  // errors
  const errors = {
    body: useSelector(bodyErrorSelector, areEqual),
  };

  // selectors
  const notes = useSelector(photoNotesSelector, areEqual);
  const photoNoteCreated = useSelector(photoNoteCreatedSelector, areEqual);
  const photoNoteEdited = useSelector(photoNoteEditedSelector, areEqual);
  const fetchingPhoto = useSelector(fetchingPhotosSelector, areEqual);
  const fetchingNotes = useSelector(fetchingPhotoNoteSelector, areEqual);

  // get selected photo notes
  const getNotes = useCallback(
    (page = 1) => {
      if (selectedPhoto?.id) {
        dispatch(listPhotoNotes(selectedPhoto.id, page));
      }
    },
    [selectedPhoto]
  );

  // initial fetch
  useEffect(() => {
    if (selectedPhoto?.id) {
      getNotes();
    }
  }, [selectedPhoto]);

  // fetch on delete
  useEffect(() => {
    if (noteDeleted) {
      getNotes();
      setNoteDeleted(false);
    }
  }, [noteDeleted]);

  // set notes form provider functions
  const onClickDeleteIcon = useCallback((id: number) => {
    setNoteId(id);
    setIsOpenDeleteNoteModal(true);
  }, []);

  const onChange = useCallback(({ target: { value } }: any) => {
    setNewNoteText(value);
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      setDisablePostButton(true);
      setTimeout(() => {
        setDisablePostButton(false);
      }, 1000);
      dispatch(createPhotoNote(selectedPhoto?.id, { body: newNoteText }));
    },
    [selectedPhoto, newNoteText]
  );

  const onClickCloseNotesToast = useCallback(() => {
    dispatch(setNoteEditedGeneral(PHOTO_NOTE_EDITED, false));
  }, []);

  // refresh notes on create
  useEffect(() => {
    if (photoNoteCreated) {
      setNewNoteText('');
      getNotes();
      dispatch(setPhotoNoteCreated(false));
    }
  }, [photoNoteCreated]);

  useEffect(() => {
    if (photoNoteEdited) {
      setTimeout(() => dispatch(setNoteEditedGeneral(PHOTO_NOTE_EDITED, false)), 1500);
    }
  }, [photoNoteEdited]);

  return (
    <div className={classes.photoNotesBase}>
      <Spinner loading={fetchingPhoto || fetchingNotes} />
      <div className={classes.photoNotesSection}>
        <div className={classes.photoNotesList}>
          {!fetchingPhoto && notes.length > 0 && (
            <NoteItems notes={notes} isReadOnly={isReadOnly} onClickDeleteIcon={onClickDeleteIcon} />
          )}
        </div>
        {photoNoteEdited && (
          <NotesToast
            id="photo-notes-toast"
            show={photoNoteEdited}
            message="Changes saved"
            closeToast={onClickCloseNotesToast}
          />
        )}
      </div>
      <div className={`col-3 ${classes.createNoteForm}`}>
        <CreateNoteForm
          errors={errors}
          noteText={newNoteText}
          disabled={disablePostButton}
          placeholderText="Add your note here..."
          pinkBackground
          onNoteChange={onChange}
          onPostButtonClick={onFormSubmit}
        />
      </div>
    </div>
  );
};

const PhotoNotesContainerMemo = memo(PhotoNotesContainer, areEqual);

export { PhotoNotesContainerMemo as PhotoNotesContainer };
