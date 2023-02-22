import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { NoLocationPlaceholder } from 'Components/ProjectData';
import { AffectedLocationModal, LocationRow } from 'Containers/ProjectData';

import classes from './affectedLocations.module.css';

interface Props {
  locations: any[];
  isModalOpen: boolean;
  selectedLocation: any;
  setIsModalOpen: (e: any) => void;
  setSelectedLocation: (e: any) => void;
  modalCloseClick: (e: any) => void;
}

const AffectedLocations = ({
  locations,
  selectedLocation,
  isModalOpen,
  setSelectedLocation,
  setIsModalOpen,
  modalCloseClick,
}: Props) => (
  <div>
    <div className={`d-flex justify-content-between align-items-baseline ${classes.subHeader}`}>
      <div className={classes.mainTitle}>Affected Locations</div>
      <div className={classes.secondaryTitle}>Add Loss Data to Affected Locations Here</div>
    </div>
    {locations.length > 0 ? (
      locations.map((location) => (
        <LocationRow
          key={location.id}
          location={location}
          setIsModalOpen={setIsModalOpen}
          setSelectedLocation={setSelectedLocation}
        />
      ))
    ) : (
      <NoLocationPlaceholder />
    )}
    <AffectedLocationModal
      location={selectedLocation}
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      onCloseClick={modalCloseClick}
    />
  </div>
);

const AffectedLocationsMemo = memo(AffectedLocations, areEqual);

export { AffectedLocationsMemo as AffectedLocations };
