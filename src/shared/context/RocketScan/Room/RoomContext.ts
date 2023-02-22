import { createContext, useContext, useState } from 'react';

export const RoomContext = createContext({});

export const roomFunctions = () => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  return {
    showLoadingSpinner,
    setShowLoadingSpinner,
  };
};

export const useRoomFunctions = () => useContext(RoomContext);
