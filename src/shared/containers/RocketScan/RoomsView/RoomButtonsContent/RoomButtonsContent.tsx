import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { AddRoom, RoomButtons, AddExterior } from 'Containers/RocketScan';

import { useSelector } from 'react-redux';
import { Spinner } from 'Components/Spinner';
import { fetchingLocationRoomsSelector, levelRoomsSelector } from 'Containers/RocketScan/RoomsView/Rooms/selectors';
import { propertySelector } from 'Containers/RocketScan/selectors';
import classes from './roomButtonsContent.module.css';

interface Props {
  location: any;
  locationId: number;
  locationType?: string;
  isCommercial?: boolean;
}

const RoomButtonsContentContainer = ({ location, locationId, locationType, isCommercial }: Props) => {
  const levelRooms = useSelector(levelRoomsSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);
  const fetching = useSelector(fetchingLocationRoomsSelector, areEqual);

  return (
    <div className={classes.roomButtonsContentBase}>
      {property?.name !== 'singlelocation' && property?.name !== 'exterior' && locationType !== 'exterior' && (
        <AddRoom location={location} isCommercial={isCommercial} />
      )}
      {property?.name !== 'singlelocation' && property?.name !== 'commercial' && locationType !== 'floor' && (
        <AddExterior location={location} locationId={locationId} />
      )}
      <div className={classes.roomButtonsBase}>
        <RoomButtons levelRooms={levelRooms} locationId={locationId} />
        {fetching && (
          <div className="w-100 position-relative mb-5 pb-5">
            <Spinner loading />
          </div>
        )}
      </div>
    </div>
  );
};

RoomButtonsContentContainer.defaultProps = {
  locationType: undefined,
  isCommercial: undefined,
};

const RoomButtonsContentContainerMemo = memo(RoomButtonsContentContainer, areEqual);

export { RoomButtonsContentContainerMemo as RoomButtonsContent };
