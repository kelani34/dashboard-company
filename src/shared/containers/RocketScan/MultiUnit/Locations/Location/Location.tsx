import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Location } from 'Components/RocketScan';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { projectSelector, propertySelector } from 'Containers/RocketScan/selectors';
import { listLocations, setLocation } from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { currentPageSelector, lastPageSelector } from 'Containers/RocketScan/MultiUnit/Locations/selectors';
import { useOnScreen } from 'Hooks/useOnScreen';

import { setRoomObject } from 'Containers/RocketScan/RoomsView/Rooms/actions';

interface Props {
  location: any;
  isLastItem: boolean;
}

const LocationContainer = ({ location, isLastItem }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef(null);

  const isOnScreen = useOnScreen(ref);

  const [roomsData, setRoomsData] = useState();

  const currentPage = useSelector(currentPageSelector, areEqual);
  const lastPage = useSelector(lastPageSelector, areEqual);

  const property = useSelector(propertySelector, areEqual);
  const project = useSelector(projectSelector, areEqual);

  // lazy load next locations
  useEffect(() => {
    if (isOnScreen && isLastItem && location?.id) {
      if (currentPage < lastPage) {
        dispatch(listLocations(property.id, currentPage + 1));
      }
    }
  }, [isOnScreen]);

  const onClickLocationName = useCallback(() => {
    const { id: locationId } = location;
    const { id: projectId } = project;

    dispatch(setLocation(location));
    dispatch(setRoomObject(roomsData));
    const path = property?.name === 'commercial' ? 'commercial' : 'multiunit';

    history.push(`/projects/${projectId}/rocketscan/${path}/${locationId}`);
  }, [property, roomsData]);

  return (
    <Location
      ref={ref}
      location={location}
      isOnScreen={isOnScreen}
      roomsData={roomsData}
      onClickLocationName={onClickLocationName}
      setRoomsData={setRoomsData}
    />
  );
};

const LocationContainerMemo = memo(LocationContainer, areEqual);

export { LocationContainerMemo as LocationContainer };
