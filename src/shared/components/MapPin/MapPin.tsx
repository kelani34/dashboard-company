import { Icon } from 'Components/Icons';
import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  onClick: any;
  selected: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  lat?: number;
  // eslint-disable-next-line react/no-unused-prop-types
  lng?: number;
}

const MapPin = ({ onClick, selected }: Props) => <Icon type={selected ? 'pinactive' : 'pin'} onClick={onClick} />;

MapPin.defaultProps = {
  lat: 0,
  lng: 0,
};

const MapPinMemo = memo(MapPin, areEqual);
export { MapPinMemo as MapPin };
