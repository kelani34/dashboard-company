import React, { memo, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';

import { locationSelector } from 'Containers/RocketScan/MultiUnit/Locations/selectors';
import { fetchingLocationsSelector } from 'Containers/RocketScan/selectors';

import { Spinner } from 'Components/Spinner';
import { RoomsView, ProjectNotes } from 'Containers/RocketScan';
import { setSelectedRoomId } from 'Containers/RocketScan/RoomsView/RoomButtons/actions';

const SingleUnitContainer = () => {
  const dispatch = useDispatch();

  // selectors
  const location = useSelector(locationSelector, areEqual);
  const fetching = useSelector(fetchingLocationsSelector, areEqual);

  const [locationId, setLocationId] = useState();
  const [locationType, setLocationType] = useState();
  const [locationCommercial, setLocationCommercial] = useState(false);

  // we need to clear selected room id to prevent unexpected scroll behaviours
  useEffect(() => {
    dispatch(setSelectedRoomId(undefined));
  }, []);

  useEffect(() => {
    if (location?.id && location?.location_type) {
      const {
        id,
        location_type: { name: locationType },
        is_commercial: isCommercial,
      } = location;
      setLocationId(id);
      setLocationType(locationType.toLocaleLowerCase());
      setLocationCommercial(isCommercial);
    }
  }, [location]);

  return (
    <>
      {fetching && <Spinner loading />}
      {!fetching && locationId && (
        <>
          <br />
          <ProjectNotes />
          <RoomsView
            location={location}
            locationId={locationId}
            locationType={locationType}
            isCommercial={locationCommercial}
          />
        </>
      )}
    </>
  );
};

const SingleUnitContainerMemo = memo(SingleUnitContainer, areEqual);

export { SingleUnitContainerMemo as SingleUnit };
