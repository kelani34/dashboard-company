import { createContext, useCallback, useContext, useState } from 'react';

export const RoomsViewContext = createContext({});

export const RoomsViewFunctions = () => {
  const [currentRoomInfo, setCurrentRoomInfo] = useState(undefined);
  const [isOpenDeleteRoomModal, setIsOpenDeleteRoomModal] = useState(false);

  const openDeleteRoomModal = useCallback(() => {
    setIsOpenDeleteRoomModal(true);
  }, []);

  const setRoomInfo = useCallback((roomId, roomName, levelName) => {
    setCurrentRoomInfo({
      roomId,
      roomName,
      levelName,
    });
  }, []);

  return {
    currentRoomInfo,
    setRoomInfo,
    isOpenDeleteRoomModal,
    setIsOpenDeleteRoomModal,
    openDeleteRoomModal,
  };
};

export const useRoomsViewFunctions = () => useContext(RoomsViewContext);
