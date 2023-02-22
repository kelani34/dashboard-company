import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { TabContentHeader } from 'Components/TabContentHeader';
import { ActionsCenter } from 'Containers/RocketScan';

interface Props {
  locationIcon: string;
  locationName: string;
  isAccessible: boolean;
}

const LocationHeader = ({ locationIcon, locationName, isAccessible }: Props) => (
  <TabContentHeader
    icon={locationIcon}
    name={locationName}
    isCommercial
    isAccessible={isAccessible}
    actionsCenter={<ActionsCenter locationType="roomsview" propertyType="multiunit" />}
    hasDivider
    isLocation
  />
);

const LocationHeaderMemo = memo(LocationHeader, areEqual);

export { LocationHeaderMemo as LocationHeader };
