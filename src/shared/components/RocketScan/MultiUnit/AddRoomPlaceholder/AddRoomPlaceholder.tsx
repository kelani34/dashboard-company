import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { AddRoom, AddExterior } from 'Containers/RocketScan';

import classes from './addRoomPlaceholder.module.css';

interface Props {
  location: any;
  locationId?: number;
  locationType?: string;
  isCommercial?: boolean;
  isCommercialProject?: boolean;
}

const AddRoomPlaceholder = ({ location, locationId, locationType, isCommercial, isCommercialProject }: Props) => (
  <div className={classes.addRoomPlaceholderBase}>
    <Icon type="rocketemblemsmall" />
    <p className={classes.noRoomsText}>No rooms yet. Add a new room</p>
    {locationType.toLocaleLowerCase() !== 'exterior' && (
      <AddRoom location={location} isCommercial={isCommercial} fromLocation />
    )}
    {locationType !== 'Floor' && !isCommercialProject && (
      <AddExterior location={location} locationId={locationId} fromLocation />
    )}
  </div>
);

AddRoomPlaceholder.defaultProps = {
  locationId: undefined,
  locationType: undefined,
  isCommercial: undefined,
  isCommercialProject: false,
};

const AddRoomPlaceholderMemo = memo(AddRoomPlaceholder, areEqual);

export { AddRoomPlaceholderMemo as AddRoomPlaceholder };
