import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Location } from 'Containers/RocketScan';
import { Spinner } from 'Components/Spinner';

import classes from './locationts.module.css';

interface Props {
  locations: any[];
  fetching: boolean;
}

const Locations = ({ locations, fetching }: Props) => (
  <>
    <Spinner loading={fetching} />
    {locations.length > 0 &&
      locations.map((location: any, index: number) => (
        <Location key={location.id} location={location} isLastItem={index === locations.length - 1} />
      ))}
    {!fetching && locations.length === 0 && (
      <p className={classes.noLocations}>No added location yet. Add a new Location</p>
    )}
  </>
);

const LocationsMemo = memo(Locations, areEqual);

export { LocationsMemo as Locations };
