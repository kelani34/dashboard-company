import { createContext, useCallback, useContext, useState } from 'react';

export const LocationsViewContext = createContext({});

export const LocationsViewFunctions = () => {
  const [currentLocationInfo, setCurrentLocationInfo] = useState({
    locationId: undefined,
    locationName: undefined,
    floorNumber: undefined,
    photosCount: 0,
    roomsCount: 0,
  });
  const [isOpenDeleteLocationModal, setIsOpenDeleteLocationModal] = useState(false);

  const openDeleteLocationModal = useCallback(() => {
    setIsOpenDeleteLocationModal(true);
  }, []);

  const setLocationInfo = useCallback((locationId, locationName, floorNumber, photosCount, roomsCount) => {
    setCurrentLocationInfo({
      locationId,
      locationName,
      floorNumber,
      photosCount,
      roomsCount,
    });
  }, []);

  return {
    currentLocationInfo,
    setLocationInfo,
    isOpenDeleteLocationModal,
    setIsOpenDeleteLocationModal,
    openDeleteLocationModal,
  };
};

export const useLocationsViewFunctions = () => useContext(LocationsViewContext);
