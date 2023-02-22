import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { ImageDeleteModal } from 'Components/ImageDeleteModal';

import { deletePhoto } from 'Containers/Thumbnail/actions';

interface Props {
  id: number;
  isOpen: boolean;
  modalCloseClick: (e: any) => void;
}

const ImageDeleteModalContainer = ({ id, isOpen, modalCloseClick }: Props) => {
  const dispatch = useDispatch();

  const onDeleteButtonClick = useCallback(() => {
    dispatch(deletePhoto(id));
  }, [id]);

  return (
    <ImageDeleteModal
      id={id}
      isOpen={isOpen}
      modalCloseClick={modalCloseClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );
};

const ImageDeleteModalContainerMemo = memo(ImageDeleteModalContainer, areEqual);

export { ImageDeleteModalContainerMemo as ImageDeleteModal };
