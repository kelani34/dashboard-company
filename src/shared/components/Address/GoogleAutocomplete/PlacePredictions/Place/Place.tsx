import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Button } from 'Components/Button';

import classes from './place.module.css';

type PlaceType = {
  placeId: string;
  mainText: string;
  secondaryText: string;
};

interface Props {
  place: PlaceType;
  onSelectItem: (e: any) => void;
}

const Place = ({ place, onSelectItem }: Props) => (
  <li>
    <Button
      className={`dropdown-item ${classes.placeText}`}
      ariaLabel="address"
      dataId={place.placeId}
      onClick={onSelectItem}
      onKeyUp={onSelectItem}
    >
      <span className={classes.mainText}>{place.mainText}</span>
      <span className={classes.secondaryText}>{place.secondaryText}</span>
    </Button>
  </li>
);

const PlaceMemo = memo(Place, areEqual);

export { PlaceMemo as Place };
