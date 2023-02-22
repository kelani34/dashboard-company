import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { ImageNotes } from 'Components/ImageNotes';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';
import { useSelector } from 'react-redux';
import { selectedPhotoSelector } from 'Containers/PhotoViewCarousel/selector';

interface Props {
  imageId?: number;
  notes?: any[];
  isOpen?: boolean;
  readonly?: boolean;
  modalCloseClick?: (e: any) => void;
  setModalStatus?: (e: any) => void;
}

const ImageNotesContainer = ({ imageId, notes, isOpen, readonly, modalCloseClick, setModalStatus }: Props) => {
  const selectedPhoto: PhotoModal = useSelector(selectedPhotoSelector, areEqual);

  return (
    <ImageNotes
      noteItems={notes}
      isOpen={isOpen}
      readonly={readonly}
      modalCloseClick={modalCloseClick}
      imageId={imageId}
      selectedPhoto={selectedPhoto}
      openModal={setModalStatus}
    />
  );
};

ImageNotesContainer.defaultProps = {
  isOpen: false,
  readonly: false,
  imageId: undefined,
  notes: [],
  modalCloseClick: undefined,
  setModalStatus: undefined,
};

const ImageNotesContainerMemo = memo(ImageNotesContainer, areEqual);

export { ImageNotesContainerMemo as ImageNotes };
