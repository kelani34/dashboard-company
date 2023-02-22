import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { Spinner } from 'Components/Spinner';
import { LocationHeader, RoomsView, LocationNotes, RocketScanWrapper } from 'Containers/RocketScan';

import { fetchingProjectSelector, projectIdSelector } from 'Containers/RocketScan/selectors';

import { locationSelector } from 'Containers/RocketScan/MultiUnit/Locations/selectors';
import { setCarouselRoutePath } from 'Containers/RocketScan/PhotoView/Carousel/actions';

import classes from './multiUnitRooms.module.css';

const MultiUnitRoomsContainer = () => {
  const dispatch = useDispatch();

  const location = useSelector(locationSelector, areEqual);
  const projectId = useSelector(projectIdSelector, areEqual);
  const fetching = useSelector(fetchingProjectSelector, areEqual);

  const [locationId, setLocationId] = useState();
  const [locationType, setLocationType] = useState();
  const [locationName, setLocationName] = useState();
  const [locationCommercial, setLocationCommercial] = useState(false);
  const [locationIcon, setLocationIcon] = useState('highrise');
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [hasFlagged, setHasFlagged] = useState(false);
  const [isAccessible, setIsAccessible] = useState(true);

  useEffect(() => {
    if (location?.id && location?.location_type) {
      const {
        id,
        name,
        location_type: { name: locationType },
        is_commercial: isCommercial,
        is_accessible: isAccessible,
        bookmarked_notes_count: bookmarkedNotesCount,
        flagged_notes_count: flaggedNotesCount,
      } = location;
      setLocationId(id);
      setLocationType(locationType.toLocaleLowerCase());
      setLocationName(name);
      setLocationCommercial(isCommercial);
      if (locationType === 'Floor') {
        setLocationIcon('unit');
      }
      setHasBookmarked(bookmarkedNotesCount > 0);
      setHasFlagged(flaggedNotesCount > 0);
      setIsAccessible(!isAccessible);
      // photo view back to room link
      dispatch(setCarouselRoutePath(`/projects/${projectId}/rocketscan/multiunit/${id}`));
    }
  }, [location]);

  return (
    <RocketScanWrapper>
      <Spinner loading={fetching} />

      {!fetching && (
        <LocationHeader locationName={locationName} locationIcon={locationIcon} isAccessible={isAccessible} />
      )}

      {!fetching && locationId && (
        <div className={classes.contentArea}>
          <LocationNotes locationId={locationId} hasBookmarked={hasBookmarked} hasFlagged={hasFlagged} />
          <RoomsView
            location={location}
            locationId={locationId}
            locationType={locationType}
            isCommercial={locationCommercial}
          />
        </div>
      )}
    </RocketScanWrapper>
  );
};

const MultiUnitRoomsContainerMemo = memo(MultiUnitRoomsContainer, areEqual);

export { MultiUnitRoomsContainerMemo as MultiUnitRoomsContainer };
