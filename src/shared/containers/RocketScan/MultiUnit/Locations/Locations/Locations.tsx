import React, { memo, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearLocations,
  listLocations,
  setFetchingLocations,
  setRefreshLocations,
} from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { projectIdSelector, propertySelector } from 'Containers/RocketScan/selectors';
import {
  fetchingLocationsSelector,
  locationsSelector,
  refreshLocationsSelector,
} from 'Containers/RocketScan/MultiUnit/Locations/selectors';

import { Locations } from 'Components/RocketScan';
import { LocationsViewProvider } from 'Context/Project';
import { DeleteLocationModal } from 'Containers/RocketScan';

const LocationsContainer = () => {
  const dispatch = useDispatch();

  // selectors
  const locations = useSelector(locationsSelector, areEqual);
  const fetching = useSelector(fetchingLocationsSelector, areEqual);
  const projectId = useSelector(projectIdSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);
  const refreshLocations = useSelector(refreshLocationsSelector, areEqual);

  const [propertyId, setPropertyId] = useState(null);
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    if (property?.id && property.id !== propertyId) {
      setPropertyId(property.id);
    }
  }, [property, projectId]);

  // fetch locations for the given property
  useEffect(() => {
    if (propertyId && !refreshLocations) {
      dispatch(listLocations(propertyId));
    } else {
      dispatch(clearLocations());
      dispatch(setFetchingLocations(false));
    }
  }, [propertyId]);

  // refetch locations on create or delete
  useEffect(() => {
    if (refreshLocations) {
      dispatch(listLocations(propertyId));
      dispatch(setRefreshLocations(false));
    }
  }, [propertyId, refreshLocations]);

  useEffect(() => {
    if (locations.length > 0) {
      setAllLocations(locations);
    }
  }, [locations]);

  return (
    <LocationsViewProvider>
      <Locations locations={allLocations} fetching={fetching} />
      <DeleteLocationModal />
    </LocationsViewProvider>
  );
};

const LocationsContainerMemo = memo(LocationsContainer, areEqual);

export { LocationsContainerMemo as LocationsContainer };
