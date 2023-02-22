import { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { projectSelector, propertySelector } from 'Containers/RocketScan/selectors';

export const RocketDryContext = createContext({});

export const RocketDryFunctions = () => {
  const project = useSelector(projectSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);

  const [isEquipmentFolder, setIsEquipmentFolder] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return {
    project,
    property,
    isEquipmentFolder,
    isInfoModalOpen,
    setIsEquipmentFolder,
    setIsInfoModalOpen,
  };
};

export const useRocketDryFunctions = () => useContext(RocketDryContext);
