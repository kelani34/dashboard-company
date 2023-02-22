import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { RoomButtonsContent, Rooms, PhotosFilter, DeleteRoomModal } from 'Containers/RocketScan';
import { RoomsViewProvider } from 'Context/Project';
import { DamagedMaterialToast } from '../DamagedMaterials/DamagedMaterialToast';

import classes from './roomsView.module.css';

interface Props {
  location: any;
  locationId: number;
  locationType?: string;
  isCommercial?: boolean;
}

const RoomsViewContainer = ({ location, locationId, locationType, isCommercial }: Props) => (
  <RoomsViewProvider>
    <div className={classes.roomsViewBase}>
      <PhotosFilter />
      <div className={classes.roomsContent}>
        <RoomButtonsContent
          location={location}
          locationId={locationId}
          locationType={locationType}
          isCommercial={isCommercial}
        />
        <Rooms locationId={locationId} />
        <DamagedMaterialToast />
      </div>
    </div>
    <DeleteRoomModal />
  </RoomsViewProvider>
);

RoomsViewContainer.defaultProps = {
  locationType: undefined,
  isCommercial: undefined,
};

const RoomsViewContainerMemo = memo(RoomsViewContainer, areEqual);

export { RoomsViewContainerMemo as RoomsViewContainer };
