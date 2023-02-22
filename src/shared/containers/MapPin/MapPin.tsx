import React, { memo, useCallback } from 'react';

import { MapPin } from 'Components/MapPin';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  onClick: any;
  selected: boolean;
  project: any;
  lat: number;
  lng: number;
}

const MapPinContainer = ({ onClick, selected, project, lat, lng }: Props) => {
  const onMapPinClick = useCallback(() => {
    if (onClick) {
      onClick(project);
    }
  }, [selected]);

  return <MapPin onClick={onMapPinClick} selected={selected} lat={lat} lng={lng} />;
};

const MapPinContainerMemo = memo(MapPinContainer, areEqual);

export { MapPinContainerMemo as MapPinContainer };
