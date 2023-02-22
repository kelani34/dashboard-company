import React, { memo, useEffect } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';
import { locationsSelector } from 'Containers/RocketScan/MultiUnit/Locations/selectors';
import { ReportLocation } from 'Containers/ReportsAndDocuments';
import { propertySelector } from 'Containers/RocketScan/selectors';
import { listLocations } from 'Containers/RocketScan/MultiUnit/Locations/actions';

import classes from './reportLocations.module.css';

const ReportLocationsContainer = () => {
  const dispatch = useDispatch();

  const property = useSelector(propertySelector, areEqual);
  const locations = useSelector(locationsSelector, areEqual);

  useEffect(() => {
    if (property?.id && locations.length === 0) {
      dispatch(listLocations(property.id, 1, 30));
    }
  }, [property]);

  return (
    <div className={classes.reportLocations}>
      {locations.map((location: any) => (
        <ReportLocation key={location.id} location={location} />
      ))}
    </div>
  );
};

const ReportLocationsContainerMemo = memo(ReportLocationsContainer, areEqual);

export { ReportLocationsContainerMemo as ReportLocationsContainer };
