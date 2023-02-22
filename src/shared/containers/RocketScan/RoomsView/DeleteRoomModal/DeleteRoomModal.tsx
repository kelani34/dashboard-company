import React, { memo, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { DeleteRoomModal } from 'Components/RocketScan';

import { useRoomsViewFunctions } from 'Context/Project/RoomsView';
import { deleteRoom, setRoomDeleted } from '../Rooms/actions';
import { roomDeletedSelector } from '../Rooms/selectors';

const DeleteRoomModalContainer = () => {
  const dispatch = useDispatch();

  const { currentRoomInfo, isOpenDeleteRoomModal, setIsOpenDeleteRoomModal }: any = useRoomsViewFunctions();

  const roomDeleted = useSelector(roomDeletedSelector, areEqual);

  const [confirmationString, setConfirmationString] = useState('');

  const onCloseClick = useCallback(() => {
    setIsOpenDeleteRoomModal(false);
    setConfirmationString('');
  }, []);

  const onDeleteClick = useCallback(
    (e: any) => {
      e.preventDefault();
      if (currentRoomInfo.roomId) {
        dispatch(deleteRoom(currentRoomInfo.roomId));
      }
    },
    [currentRoomInfo]
  );

  // close and reset modal when room is deleted
  useEffect(() => {
    if (roomDeleted) {
      setIsOpenDeleteRoomModal(false);
      dispatch(setRoomDeleted(false));
      setConfirmationString('');
    }
  }, [roomDeleted]);

  const onChangeConfirmationString = useCallback((e: any) => {
    const { value } = e.target;

    setConfirmationString(value);
  }, []);

  return (
    <DeleteRoomModal
      isOpen={isOpenDeleteRoomModal}
      confirmationString={confirmationString}
      currentRoomInfo={currentRoomInfo}
      onChangeConfirmationString={onChangeConfirmationString}
      onCloseClick={onCloseClick}
      onDeleteClick={onDeleteClick}
    />
  );
};

const DeleteRoomModalContainerMemo = memo(DeleteRoomModalContainer, areEqual);

export { DeleteRoomModalContainerMemo as DeleteRoomModal };
