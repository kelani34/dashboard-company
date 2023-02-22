import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { LocationRow } from 'Components/ProjectData';

interface Props {
  location: any;
  setIsModalOpen: (e: any) => void;
  setSelectedLocation: (e: any) => void;
}

const LocationRowContainer = ({ location, setIsModalOpen, setSelectedLocation }: Props) => {
  const onRowClick = useCallback(() => {
    setIsModalOpen(true);
    setSelectedLocation(location);
  }, []);

  return <LocationRow location={location} onClick={onRowClick} />;
};

const LocationRowContainerMemo = memo(LocationRowContainer, areEqual);

export { LocationRowContainerMemo as LocationRow };
