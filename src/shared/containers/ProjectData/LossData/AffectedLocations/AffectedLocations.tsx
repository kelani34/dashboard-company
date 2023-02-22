import React, { memo, useCallback, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { AffectedLocations } from 'Components/ProjectData';

import { useLossDataFunctions } from 'Context/LossData';

const AffectedLocationsContainer = () => {
  const { locations }: any = useLossDataFunctions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(undefined);

  const modalCloseClick = useCallback((e: any) => {
    e.preventDefault();
    setIsModalOpen(false);
  }, []);

  return (
    <AffectedLocations
      locations={locations}
      selectedLocation={selectedLocation}
      isModalOpen={isModalOpen}
      setSelectedLocation={setSelectedLocation}
      setIsModalOpen={setIsModalOpen}
      modalCloseClick={modalCloseClick}
    />
  );
};

const AffectedLocationsContainerMemo = memo(AffectedLocationsContainer, areEqual);

export { AffectedLocationsContainerMemo as AffectedLocations };
